# `Jenkins` 集成私有 `Gitlab`

## 插件安装

首先进入 `Jenkins` 的插件管理界面。

![Jenkins管理插件入口](assets/images/Jenkins管理插件入口.png)

安装 `GitLab` 插件。

![Jenkins安装Gitlab插件](assets/images/Jenkins安装Gitlab插件.png)

安装 `Git Parameter` 插件。

![Jenkins安装GitParameter插件](assets/images/Jenkins安装GitParameter插件.png)

安装 `Generic Webhook Trigger` 插件。

![Jenkins安装GenericWebhookTrigger插件](assets/images/Jenkins安装GenericWebhookTrigger插件.png)

## 插件配置

### `Gitlab` 创建 `Access Token`

如下图所示，在 `Gitlab` 中创建用户的 `Access Token`

![Gitlab创建AccessToken](assets/images/Gitlab创建AccessToken.png)

创建后会在页面上显示 `Access Token` ，这个在后面会用到。

![Gitlab创建AccessToken完成](assets/images/Gitlab创建AccessToken完成.png)

### `Jenkins` 全局配置

进入 `Jenkins` 全局配置页面

![Jenkins全局配置入口](assets/images/Jenkins全局配置入口.png)

填写 `Connection name` 和 `Gitlab host URL` 字段。

![Jenkins全局配置Gitlab](assets/images/Jenkins全局配置Gitlab.png)

添加 `Credentials` 。配置 `API Token` 凭证。

![Jenkins配置Gitlab_API_Token凭证](assets/images/Jenkins配置Gitlab_API_Token凭证.png)

之后选择新建的凭证，并进行测试，如下所示：

![Jenkins全局配置Gitlab测试](assets/images/Jenkins全局配置Gitlab测试.png)

上图返回了 `Success` ，表示成功了！

最后，点击页面下方的 `保存` 按钮即可配置完成！
