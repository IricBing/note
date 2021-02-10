# VMWareESXi Ubuntu虚拟机 `LVM` 导致磁盘空间未完全占用

## 产生原因

在创建 `Ubuntu` 虚拟机的时候，磁盘管理采用了 `LVM` 方式，这个时候尽管给虚拟机分配了很大的磁盘，但是其并没有完全利用。

查看磁盘空间发现仅有 `196G` 空间

``` shell
$ df -h
df: /var/nfs/gernel: Stale file handle
Filesystem                         Size  Used Avail Use% Mounted on
udev                               1.9G     0  1.9G   0% /dev
tmpfs                              394M  1.8M  392M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  196G   75G  111G  41% /
tmpfs                              2.0G     0  2.0G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
tmpfs                              2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/sda2                          976M  292M  618M  33% /boot
/dev/loop5                          56M   56M     0 100% /snap/core18/1944
10.87.23.111:/data/nfs             196G   19G  168G  10% /home/ubuntu/test
/dev/loop6                          32M   32M     0 100% /snap/snapd/10707
/dev/loop0                          70M   70M     0 100% /snap/lxd/19032
/dev/loop4                          70M   70M     0 100% /snap/lxd/19188
/dev/loop2                          56M   56M     0 100% /snap/core18/1988
/dev/loop1                          32M   32M     0 100% /snap/snapd/11036
tmpfs                              394M     0  394M   0% /run/user/1000
```

> 实际发现，无论是 `800G` 还是 `3T` 的磁盘，默认创建的虚拟机都只有 `196G` 。

此现象是由于 `LVM` 的**特性**导致的，具体请转至笔记：[LVM](../../Ubuntu/基础知识/LVM.md)

## 解决办法

首先查看一下 `VG` (**卷组**)列表：

``` shell
$ sudo vgdisplay
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  2
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <799.00 GiB
  PE Size               4.00 MiB
  Total PE              204543
  Alloc PE / Size       51200 / 200.00 GiB
  Free  PE / Size       153343 / <599.00 GiB
  VG UUID               I3vwBN-KX5X-hXDy-dQjp-ZXm3-7wGU-WiARr1
```

发现现在只有一个 `VG` ，注意看 `Free  PE / Size` 字段，发现其值为： `153343 / <599.00 GiB` ，这个表示已经使用了 `153343M` ，也就是 `153G` 。还有 `599G` 可分配空间。

接下来将剩余可用空间全部分配下去：

``` shell
$ sudo lvextend -l +100%FREE /dev/mapper/ubuntu--vg-ubuntu--lv
  Size of logical volume ubuntu-vg/ubuntu-lv changed from 200.00 GiB (51200 extents) to <799.00 GiB (204543 extents).
  Logical volume ubuntu-vg/ubuntu-lv successfully resized.
```

然后执行调整：

``` shell
$ sudo resize2fs /dev/mapper/ubuntu--vg-ubuntu--lv
```

再次查看磁盘信息和 `VG` 信息：

``` shell
$ df -h
df: /var/nfs/gernel: Stale file handle
Filesystem                         Size  Used Avail Use% Mounted on
udev                               1.9G     0  1.9G   0% /dev
tmpfs                              394M  1.8M  392M   1% /run
/dev/mapper/ubuntu--vg-ubuntu--lv  786G   75G  677G  10% /
tmpfs                              2.0G     0  2.0G   0% /dev/shm
tmpfs                              5.0M     0  5.0M   0% /run/lock
tmpfs                              2.0G     0  2.0G   0% /sys/fs/cgroup
/dev/sda2                          976M  292M  618M  33% /boot
/dev/loop5                          56M   56M     0 100% /snap/core18/1944
10.87.23.111:/data/nfs             196G   19G  168G  10% /home/ubuntu/test
/dev/loop6                          32M   32M     0 100% /snap/snapd/10707
/dev/loop0                          70M   70M     0 100% /snap/lxd/19032
/dev/loop4                          70M   70M     0 100% /snap/lxd/19188
/dev/loop2                          56M   56M     0 100% /snap/core18/1988
/dev/loop1                          32M   32M     0 100% /snap/snapd/11036
tmpfs                              394M     0  394M   0% /run/user/1000

$ sudo vgdisplay
  --- Volume group ---
  VG Name               ubuntu-vg
  System ID             
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                1
  Open LV               1
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               <799.00 GiB
  PE Size               4.00 MiB
  Total PE              204543
  Alloc PE / Size       204543 / <799.00 GiB
  Free  PE / Size       0 / 0   
  VG UUID               I3vwBN-KX5X-hXDy-dQjp-ZXm3-7wGU-WiARr1
```

可以看到 `Free  PE / Size` 的值已经是 `0 / 0` 了，根目录的大小也变成了 `786G`
