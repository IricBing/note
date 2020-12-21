# MVVM 架构篇

## 定义

* `M`: **Model**（服务器上的业务逻辑操作）
* `V`：**View**（页面）
* `VM`: **ViewModel**（Model与View之间**核心枢纽**，比如`Vue.js`）

``` mermaid
graph LR;
    View --> ViewModel;
    ViewModel --> View;
    ViewModel --> Model;
    Model --> ViewModel;
```

`Model` 与 `ViewModel` 之间，通过 `http` 协议（ `axios` 库等）和 `websocket` 协议（ `socket.io` 库等）相互通信，二者形成双向关系。

`View` 与 `ViewModel` 之间，通过**发布订阅，时间驱动，观察者**等技术来实现：**ViewModel中的数据改变，可以同时改变View上的显示内容**与**View上的内容改变(比如输入框中的内容)，也可以同时改变ViewModel中对应的数据功能**，二者由此形成双向关系。

## 双向绑定

**正向：** 数据驱动页面

**反向：** 页面更新数据

``` mermaid
graph LR;
    view -- 反向 --> data;
    data -- 正向 --> view;
```

具体实现可参考笔记：[vue2.x 双向绑定](../../../Web/Vue/2.x/基础知识/双向绑定.md)

### 双向绑定架构图

``` mermaid
graph LR;
    data -- 监听 --> observer;
    observer -- 通知 --> dep;
    dep -- 回调 --> watcher;
    watcher -- 订阅 --> dep;
    watcher -- 更新 --> view;
```

* `observer`(**监听者**)：监听`data`的变化，一旦监听到变化，就通知`dep`(观察者列表)
* `dep`(**观察者列表**)：一旦收到来自`observer`的通知，就会回调所有的观察者(`watcher`)，做相应的更新处理。
* `watcher`(**观察者**)：观察者这里存放的就是相应的更新处理，会更新`view`的显示内容。另外，观察者可以通过订阅的方式，加入到`dep`(观察者列表中)
