# 字模篇

## 介绍

`字模` 这个名词可能很多人没有听过（ `PS：` 本人就是第一次听到），众所周知，显示屏显示是根据**像素**来的，分辨率越高，像素点显示的越密集。对于一些低成本硬件来说，它的资源不够多，将字库资源加载进去并解析是一件比较耗费资源的事情。以 `LED屏` 来举例，它只能显示点阵字，如下所示：

``` shell
○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ 
○ ○ ○ ○ ■ ■ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
○ ○ ■ ■ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ○ ■ ○ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ■ ■ ○ ■ ■ ■ ■ ■ ■ ■ ○ ■ ■ ○
○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ■ ○ ○ ■ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ■ ○ ■ ■ ○ ○ ■ ■ ○ ○ ○ ■ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ■ ■ ■ ■ ■ ■ ■ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ○ ○ ○ ■ ■ ○
○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ○ ○ ■ ■ ○
○ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○ 
○ ○ ■ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ○ ○ ■ ○ ○ ○ ○ ■ ○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ■ ■ ○ ○ ■ ■ ○ ■ ○ ○ ○ ■ ○ ○ ○ ■ ■ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○
○ ○ ■ ■ ■ ■ ○ ■ ○ ○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ 
○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○
```

这个时候就需要将字提取出来这种点阵信息，之后再显示即可。

## 提取方案（Python版）

### 字库

首先我们要准备 `字库` ，字库是存储汉字信息的点阵字库，需要根据所需的点阵阵列来选择，常见的阵列有： `16x16` 、 `24x24` 、 `32x32` 、 `40x40` 、 `48x48` 等正方形的，也有 `8x12` 、 `16x12` 等矩形的。

`注意：` 这里的字库与软件使用的 `ttf` 等不是一个字库！

收集好的字库：[字库](assets/files/font_library.zip)

拿 `16x16` 的 `LED` 显示屏来举例，字库是符合 `GB2312` 国家标准的 `16×16` 点阵字库。共有汉字 `6763` 个，符号 `682` 个。其中**一级汉字**有 `3755` 个，按**声序**排列，**二级汉字**有 `3008` 个，按**偏旁部首**排列。

一个 `GB2312` 汉字是由**两个字节**编码的，范围为 `0xA1A1~0xFEFE` 。 `A1-A9` 为**符号区**， `B0-F7` 为**汉字区**。每一个区有 `94` 个字符。

`注意:` 这只是编码的许可范围，不一定都有字型对应，比如符号区就有很多编码空白区域。

#### 字模数据提取——汉字

一个汉字占**两个字节**，这两个中前一个字节为该汉字的**区号**，后一个字节为该字的**位号**。其中，每个区记录 `94` 个汉字，位号为该字在该区中的位置。

* `区码：`汉字的第一个字节-`0xA0`，因为汉字编码是从`0xA0`区开始的，所以文件最前面就是从`0xA0`区开始，要算出相对区码
* `位码：`汉字的第二个字节-`0xA0`

这样我们就可以得到汉字在 `HZK16` 中的**绝对偏移位置**： `offset = (94*(区码-1)+(位码-1))*32` 。

说明：

* 区码减`1`是因为数组是以`0`为开始而区号位号是以`1`为开始的
* `(94*(区号-1)+位号-1)`是一个汉字字模占用的`字节数`
* 最后乘以`32`是因为汉字库文应从该位置起的`32`字节信息记录该字的字模信息(前面提到一个汉字要有`32`个字节显示)

#### 字模数据提取—— `ASCII`

`ASCII` 码的从空格（ `0x20` ）开始，每 `16` 个字节表示一个字符的点阵字模。以字母 `A` 为例，它的 `ASCII` 码是 `0x41` ，那么，它的字模数据的开始位置就是： `（0x41-0x20）*16`

从这个位置开始依次读取 `16` 个字节，就是字母 `A` 的字模数据，将其显示即可。

### 代码实现

上面已经讲解了提取思路，接下来进行代码演示：[完整项目](assets/files/提取字模-Python版.zip)

新建项目，项目结构如下：

``` shell
.
├── HZK16
└── main.py

0 directories, 2 files
```

其中， `HZK16` 文件可从前面提供的字库里提取，**注意点阵类型**。

<details>
<summary>展开查看源码</summary>

``` python
import binascii
KEYS = [0x80, 0x40, 0x20, 0x10, 0x08, 0x04, 0x02, 0x01]

def printPlay(textStr,line,background):
    # 初始化16*16的点阵位置，每个汉字需要16*16=256个点来表示，需要32个字节才能显示一个汉字
    # 之所以32字节：256个点每个点是0或1，那么总共就是2的256次方，一个字节是2的8次方
    rect_list = [] * 16
    for i in range(16):
        rect_list.append([] * 16)

    for text in textStr:
        #获取中文的gb2312编码，一个汉字是由2个字节编码组成
        gb2312 = text.encode('gb2312')
        #将二进制编码数据转化为十六进制数据
        hex_str = binascii.b2a_hex(gb2312)
        #将数据按unicode转化为字符串
        result = str(hex_str, encoding='utf-8')

        #前两位对应汉字的第一个字节：区码，每一区记录94个字符
        area = eval('0x' + result[:2]) - 0xA0
        #后两位对应汉字的第二个字节：位码，是汉字在其区的位置
        index = eval('0x' + result[2:]) - 0xA0
        #汉字在HZK16中的绝对偏移位置，最后乘32是因为字库中的每个汉字字模都需要32字节
        offset = (94 * (area-1) + (index-1)) * 32

        font_rect = None

        #读取HZK16汉字库文件
        with open("HZK16", "rb") as f:
            #找到目标汉字的偏移位置
            f.seek(offset)
            #从该字模数据中读取32字节数据
            font_rect = f.read(32)

        #font_rect的长度是32，此处相当于for k in range(16)
        for k in range(len(font_rect) // 2):
            #每行数据
            row_list = rect_list[k]
            for j in range(2):
                for i in range(8):
                    asc = font_rect[k * 2 + j]
                    #此处&为Python中的按位与运算符
                    flag = asc & KEYS[i]
                    #数据规则获取字模中数据添加到16行每行中16个位置处每个位置
                    row_list.append(flag)

    #根据获取到的16*16点阵信息，打印到控制台
    for row in rect_list:
        for i in row:
            if i:
                #前景字符（即用来表示汉字笔画的输出字符）
                print(line, end=' ')
            else:
                # 背景字符（即用来表示背景的输出字符）
                print(background, end=' ')
        print()

inpt = input("写你所想：")
lineSign = '■'
#lineSign = "0"

backgroundSign = '○'
#backgroundSign = "."
printPlay(inpt,lineSign,backgroundSign)
```

</details>

执行效果：

``` shell
$ python main.py
写你所想：我爱中国
○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ 
○ ○ ○ ○ ■ ■ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■
○ ○ ■ ■ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ■ ○ ■ ○ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ■ ■ ○ ■ ■ ■ ■ ■ ■ ■ ○ ■ ■ ○ 
○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ■ ○ ○ ■ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ■ ○ ■ ■ ○ ○ ■ ■ ○ ○ ○ ■ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ■ ■ ■ ■ ■ ■ ■ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ○ ○ ○ ■ ■ ○
○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ○ ○ ■ ■ ○
○ ■ ■ ■ ■ ■ ○ ○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○
○ ○ ■ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ■ ■ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ○ ■ ○ ○ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ○ ○ ■ ○ ○ ○ ○ ■ ○ ○ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○
○ ○ ○ ○ ■ ■ ○ ○ ■ ■ ○ ○ ■ ■ ○ ■ ○ ○ ○ ■ ○ ○ ○ ■ ■ ○ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○
○ ○ ■ ■ ■ ■ ○ ■ ○ ○ ○ ○ ○ ■ ■ ■ ○ ○ ■ ○ ○ ○ ■ ■ ○ ○ ○ ■ ■ ■ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ■ ○
○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ■ ■ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ■ ○ ○
```

代码讲解可查看：[Python版代码讲解](Python版代码讲解.md)
