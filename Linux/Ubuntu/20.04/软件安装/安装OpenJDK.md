# Ubuntu 20.04 安装OpenJDK

## 安装

``` shell
$ sudo apt install openjdk-8-jdk
```

## 配置环境变量

`注意：` 此举仅仅是为了能够使得JAVA_HOME能够显示出来，我们通过apt安装之后，已经有java和javac的环境了，此举是为了其他服务使用的，例如：tomcat

### Step1. 修改.zshrc文件，末尾加入：

``` bash
export JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
export JRE_HOME=$JAVA_HOME/jre 
```

### Step2. 保存并加载

``` shell
$ source ~/.zshrc
```

### Step3. 检测

``` shell
$ echo $JAVA_HOME
```
