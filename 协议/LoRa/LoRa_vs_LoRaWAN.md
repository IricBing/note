# LoRa vs LoRa WAN

先说一下定义：

- LoRa 是低功耗广域网通信技术中的一种，是 Semtech 公司专有的**一种基于扩频技术的超远距离无线传输技术**。
- LoRaWAN 是为 LoRa 远距离通信网络设计的**一套通讯协议和系统架构**。它是**一种媒体访问控制（MAC）层协议**。

**协议栈原理图**
![LoRaWAN协议栈.png](assets/images/LoRaWAN协议栈.png)
图中：**LoRa=PHY Layer**，**LoRaWAN=MAC Layer** <br />
结论：**LoRa 是 LoRaWan 的一个子集，LoRa 仅仅包括物理层定义，LoRaWan 还包括了链路层。**
