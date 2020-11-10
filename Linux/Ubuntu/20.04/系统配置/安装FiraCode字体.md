# Ubuntu 20.04 安装 Fira Code 字体

## 采坑提示

习惯了ubuntu 的apt命令，一般安装软件都会通过 `$ sudo apt-cache search xxx` 来搜索是否存在，如果存在，就安装，这个就遇到坑了！

``` shell
$ sudo apt-cache search firacode    
fonts-firacode - Monospaced font with programming ligatures
texlive-latex-extra - TeX Live: LaTeX additional packages
```

可以看到，有软件叫 `fonts-firacode` ，因此我通过 `$ sudo apt install fonts-firacode` 来安装了这个软件，结果查看字体的时候显示的并不是 `ttf` 字体，而是 `otf` 字体！

``` shell
$ fc-list | grep Fira                          
/usr/share/fonts/opentype/firacode/FiraCode-Retina.otf: Fira Code,Fira Code Retina:style=Retina,Regular
/usr/share/fonts/opentype/firacode/FiraCode-Bold.otf: Fira Code:style=Bold
/usr/share/fonts/opentype/firacode/FiraCode-Regular.otf: Fira Code:style=Regular
/usr/share/fonts/opentype/firacode/FiraCode-Medium.otf: Fira Code,Fira Code Medium:style=Medium,Regular
/usr/share/fonts/opentype/firacode/FiraCode-Light.otf: Fira Code,Fira Code Light:style=Light,Regular
```

因此，这种方式并不可取！！！

## 脚本安装方式

**编写脚本**
新建 `install.sh` 脚本，写入如下内容:

``` bash
#!/usr/bin/env bash

fonts_dir="${HOME}/.local/share/fonts"
if [ ! -d "${fonts_dir}" ]; then
    echo "mkdir -p $fonts_dir"
    mkdir -p "${fonts_dir}"
else
    echo "Found fonts dir $fonts_dir"
fi

for type in Bold Light Medium Regular Retina; do
    file_path="${HOME}/.local/share/fonts/FiraCode-${type}.ttf"
    file_url="https://github.com/tonsky/FiraCode/blob/master/distr/ttf/FiraCode-${type}.ttf?raw=true"
    if [ ! -e "${file_path}" ]; then
        echo "wget -O $file_path $file_url"
        wget -O "${file_path}" "${file_url}"
    else
	echo "Found existing file $file_path"
    fi;
done

echo "fc-cache -f"
fc-cache -f
```

**运行**

``` shell
$ sh install.sh
```

**查看结果**

``` shell
$ fc-list | grep Fira
/home/iric/.local/share/fonts/FiraCode-Light.ttf: Fira Code,Fira Code Light:style=Light,Regular
/home/iric/.local/share/fonts/FiraCode-Bold.ttf: Fira Code:style=Bold
/home/iric/.local/share/fonts/FiraCode-Medium.ttf: Fira Code,Fira Code Medium:style=Medium,Regular
/usr/share/fonts/opentype/firacode/FiraCode-Retina.otf: Fira Code,Fira Code Retina:style=Retina,Regular
/home/iric/.local/share/fonts/FiraCode-Retina.ttf: Fira Code,Fira Code Retina:style=Retina,Regular
/usr/share/fonts/opentype/firacode/FiraCode-Bold.otf: Fira Code:style=Bold
/usr/share/fonts/opentype/firacode/FiraCode-Regular.otf: Fira Code:style=Regular
/usr/share/fonts/opentype/firacode/FiraCode-Medium.otf: Fira Code,Fira Code Medium:style=Medium,Regular
/usr/share/fonts/opentype/firacode/FiraCode-Light.otf: Fira Code,Fira Code Light:style=Light,Regular
/home/iric/.local/share/fonts/FiraCode-Regular.ttf: Fira Code:style=Regular
```

这里面就有 `ttf` 字体文件了！

## 附件

[install.sh](assets/files/install.sh)
