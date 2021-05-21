# `JavaScript` 字符编码问题

`JavaScript` 默认编码是 `UTF-8` ，通过内置的 `charCodeAt()` 方法得到的是 `UTF-8` 格式的编码，有的时候想要知道其他编码格式的编码，就需要使用库来进行转换了。

现在 `JavaScript` 生态目前最流行的编码转换库有两个，一个是[iconv-lite](https://www.npmjs.com/package/iconv-lite)，一个是[iconv](https://www.npmjs.com/package/iconv)，从流行程度，性能上来说， `iconv-lite` 更胜一筹，因此采用 `iconv-lite` 这个库更优。

采坑血泪史：我的应用场景是汉字提取字模，也就是得到汉字的 `GB2312` 编码后找到其在汉字字库中的顺序，然后按照这个顺序读取字库文件即可。我最开始是直接搜索的 `GB2312` 相关的，然后选择了[encode-gb2312](https://www.npmjs.com/package/encode-gb2312)这个库，这个库只做了一部分的字符转换，例如：中文句号 `。` 得到的编码结果就是不正确的，坑死了，以后这种下载量少的包千万不能用！！！
