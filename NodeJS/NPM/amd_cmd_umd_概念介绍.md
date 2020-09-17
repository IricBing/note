# amd vs cmd vs umd

初学者经常会有这样一个操作，从网上找到一个其他人写好的项目，clone下来，之后**npm i**（或者**yarn install**），打开代码，可以看到很多以下内容：

``` javascript
import foo from 'package';
const bar = require('package');
```
作为纯新手应该也能理解，这些代码的意思是加载模块，利用别人写好的模块来为自己服务，避免重复造轮子。本文就是介绍这些包的打包规范。

**举个栗子：** 钢结构大桥，各个部位如何连接呢？通常有铆钉，螺栓，焊接等方式，amd，cmd和umd就可以理解为这些连接方式。

等等，写不过来了，敬请期待。。。