# MQTT QoS 介绍

参考网址：[MQTT系列 | MQTT的QoS介绍](https://zhuanlan.zhihu.com/p/80203905)

## QoS是用来干什么的？

QoS（Quality of Service） 是消息的发送方（Sender）和接受方（Receiver）之间达成的一个协议。用来**保证消息稳定传输的机制**，包括消息应答、存储和重传。

在这套机制下，提供了三种不同层次QoS：
|QoS|级别|含义|
| :----------: | :-----------:  | :-----------: |
|QoS0|至多一次|Sender 发送的一条消息，Receiver 最多能收到一次，也就是说 Sender 尽力向 Receiver 发送消息，如果发送失败，也就算了|
|QoS1|至少一次|Sender 发送的一条消息，Receiver 至少能收到一次，也就是说 Sender 向 Receiver 发送消息，如果发送失败，会继续重试，直到 Receiver 收到消息为止，但是因为重传的原因，Receiver 有可能会收到重复的消息|
|QoS2|确保只有一次|Sender 发送的一条消息，Receiver 确保能收到而且只收到一次，也就是说 Sender 尽力向 Receiver 发送消息，如果发送失败，会继续重试，直到 Receiver 收到消息为止，同时保证 Receiver 不会因为消息重传而收到重复的消息|

**注意：** QoS是Sender和Receiver之间的协议，而不是Publisher和Subscriber之间的协议。换句话说，Publisher发布了一条QoS1的消息，只能保证Broker能至少收到一次这个消息；而对于Subscriber能否至少收到一次这个消息，还要取决于Subscriber在Subscribe的时候和Broker协商的QoS等级。

## QoS0

QoS0等级下，Sender和Receiver之间一次消息的传递流程如下：

![QoS0消息传递流程图](assets/images/QoS0消息传递流程图.png)

Sender向Receiver发送一个包含消息数据的PUBLISH包，然后不管结果如何，丢掉已发送的PUBLISH包，一条消息的发送完成。

## QoS1

QoS1要保证消息至少到达一次，所以有一个应答的机制。Sender和Receiver的一次消息的传递流程如下：

![QoS1消息传递流程图](assets/images/QoS1消息传递流程图.png)

流程：

1. Sender向Receiver发送一个带有数据的PUBLISH包，并在本地保存这个PUBLISH包。
2. Receiver收到PUBLISH包以后，向Sender发送一个PUBACK数据包，PUBACK数据包没有消息体（Payload），在可变头中有一个包标识（Packet Identifier），和它收到的PUBLISH包中的Packet Identifier一致。
3. Sender收到PUBACK之后，根据PUBACK包中的Packet Identifier找到本地保存的PUBLISH包，然后丢弃掉，一次消息的发送完成。

但是消息传递流程中**可能会出现问题**：

1. 如果Sender在一段时间内没有收到PUBLISH包对应的PUBACK，它将该PUBLISH包的DUP标识设为1（代表是重新发送的PUBLISH包），然后重新发送该PUBLISH包。
1. Receiver可能会重复收到消息，需自行去重。

## QoS2

相比QoS0和QoS1, QoS2不仅要确保Receiver能收到Sender发送的消息，还需要确保消息不重复。它的重传和应答机制就要复杂一些，同时开销也是最大的。QoS2下，一次消息的传递流程如下所示：

![QoS1消息传递流程图](assets/images/QoS1消息传递流程图.png)

流程：

1. Sender发送QoS为2的PUBLISH数据包，数据包 Packet Identifier 为 P，并在本地保存该PUBLISH包；
1. Receiver收到PUBLISH数据包后，在本地保存PUBLISH包的Packet Identifier P，并回复Sender一个PUBREC数据包，PUBREC数据包可变头中的Packet Identifier为P，没有消息体（Payload）；
1. 当Sender收到PUBREC，它就可以安全的丢弃掉初始Packet Identifier为P的PUBLISH数据包。同时保存该PUBREC数据包，并回复Receiver一个PUBREL数据包，PUBREL数据包可变头中的Packet Identifier为P，没有消息体；
1. 当Receiver收到PUBREL数据包，它可以丢掉保存的PUBLISH包的Packet Identifier P，并回复Sender一个可变头中 Packet Identifier 为 P，没有消息体（Payload）的PUBCOMP数据包；
1. 当Sender收到PUBCOMP包，那么认为传输已完成，则丢掉对应的PUBREC数据包；

上面是一次完整无误的传输过程，然而传输过程中可能会出现以下情况：

* **情况1：** Sender发送PUBLISH数据包给Receiver的时候，发送失败；
* **情况2：** Sender已经成功发送PUBLISH数据包给Receiver了，但是Receiver发送PUBREC数据包失败；
* **情况3：** Sender已经成功收到了PUBREC数据包，但是PUBREL数据包发送失败；
* **情况4：** Receiver已经收到了PUBREL数据包，但是发送PUBCOMP数据包时发送失败

针对上述的问题，较为详细的处理方法如下：

* 不管是情况1还是情况2，因为Sender在一定时间内没有收到PUBREC，那么它会把PUBLISH包的DUP标识设为1，重新发送该PUBLISH数据包；
* 不管是情况3还是情况4，因为Sender在一定时间内没有收到PUBCOMP包，那么它会重新发送PUBREL数据包；
* 针对情况2，Receiver可能会收到多个重复的PUBLISH包，更加完善的处理如下： 

Receiver在收到PUBLISH数据包之后，马上回复一个PUBREC数据包。并会在本地保存PUBLISH包的Packet Identifier P，不管之后因为重传多少次这个Packet Identifier 为P的数据包，Receiver都认为是重复的，丢弃。同时Receiver接收到QoS为2的PUBLISH数据包后，并不马上投递给上层，而是在本地做持久化，将消息保存起来（这里需要是持久化而不是保存在内存）。

* 针对情况4，更加完善的处理如下：

Receiver收到PUBREL数据包后，正式将消息递交给上层应用层，投递之后销毁Packet Identifier P，并发送PUBCOMP数据包，销毁之前的持久化消息。之后不管接收到多少个PUBREL数据包，因为没有Packet Identifier P，直接回复PUBCOMP数据包即可。

# QoS降级

在 MQTT 协议中，从 Broker 到 Subscriber 这段消息传递的实际 QoS 等于：Publisher 发布消息时指定的 QoS 等级和 Subscriber 在订阅时与 Broker 协商的 QoS 等级，这两个 QoS **等级中的最小那一个**。

> **Actual Subscribe QoS = MIN(Publish QoS, Subscribe QoS)**

# QoS和会话

如果 Client 想接收离线消息，必须使用持久化的会话（Clean Session = 0）连接到 Broker，这样 Broker 才会存储 Client 在离线期间没有确认接收的 QoS 大于 等于1 的消息。

> 在发送QoS为1或2的情况，Broker（此时为Sender）会将发送的PUBLISH数据包保存到本地，直到收到一系列回复的数据包，然而Client（此时为Receiver）在离线期间无法回复相应的数据包，所以会一直存储。

# QoS等级使用建议

<table>
    <tbody>
        <tr>
            <td rowspan=3>QoS0</td>
            <td>Client 和 Broker 之间的网络连接非常稳定，例如一个通过有线网络连接到 Broker 的测试用 Client</td>
        </tr>
        <tr>
            <td>可以接受丢失部分消息，比如你有一个传感器以非常短的间隔发布状态数据，所以丢一些也可以接受</td>
        </tr>
        <tr>
            <td>不需要离线消息</td>
        </tr>
        <tr>
            <td rowspan=2>QoS1</td>
            <td>需要接收所有的消息，而且应用可以接受并处理重复的消息</td>
        </tr>
        <tr>
            <td>无法接受 QoS2 带来的额外开销，QoS1 发送消息的速度比 QoS2 快很多</td>
        </tr>
        <tr>
            <td>QoS2</td>
            <td>应用必须接收到所有的消息，而且应用在重复的消息下无法正常工作，同时也能接受 QoS2 带来的额外开销</td>
        </tr>
    </tbody>
</table>
