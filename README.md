[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage)

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage&project-name=tg-message&build-command=&install-command=&output-directory=edge_deploy&root-directory=./&env=token,sign_key&env-description=)

## 技术赞助
本项目的 CDN 加速和安全防护由 [亚洲最佳CDN、边缘和安全解决方案 - Tencent EdgeOne](https://edgeone.ai/?utm_source=TgMessage) 赞助。

<a href="https://edgeone.ai/?utm_source=TgMessage">
  <img width="200" src="https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png" alt="Tencent EdgeOne">
</a>

## 第一步：创建 Telegram 机器人 (公共教程)

在部署之前，您首先需要一个 Telegram Bot。

1.  **关注 BotFather**: 在 Telegram 中搜索并关注官方的 [BotFather](https://t.me/BotFather)。
2.  **创建机器人**: 
    *   向 BotFather 发送 `/newbot` 命令。
    *   根据提示，依次输入机器人的显示名称（例如 `我的消息助手`）和用户名（必须以 `bot` 结尾，例如 `my_message_assistant_bot`）。
    ![oEENc.png](/img/img.png)
3.  **获取 Token**: 创建成功后，BotFather 会发送一条包含 **API Token** 的消息。请务必保存好这个 Token，它在后续部署中是必需的。
    ![oEGEr.png](/img/img_1.png)
4.  **设置命令**: 为了方便获取 `chat_id`，需要为机器人设置一个命令。
    *   向 BotFather 发送 `/mybots`，然后选择你刚刚创建的机器人。
    *   点击 `Edit Bot` -> `Edit Commands`。
    *   输入 `token - 获取个人 Token` 并发送。
    ![oEQIM.png](/img/img_2.png)

---

## 第二步：选择平台进行部署

您可以选择 Vercel 或 腾讯云 EdgeOne 进行部署，两者择一即可。

### 选项 A：通过 Vercel 部署

Vercel 提供免费、快速的 Serverless 函数托管服务。

1.  **一键部署**: 点击项目顶部的 **Deploy with Vercel** 按钮。
2.  **设置环境变量**: 在 Vercel 的项目创建页面，你需要配置以下环境变量：
    *   `token`: **【必填】** 填入上一步获取的机器人 API Token。
    *   `sign_key`: **【建议】** 用于加密 `chat_id` 的密钥，不设置默认为 `abc`。建议设置为一个复杂的随机字符串。
    *   `key`: **【建议】** 设置 Webhook 时的管理密钥，防止他人调用。请设置为一个复杂的随机字符串。
    *   `url`: **【可选】** 你的 Webhook 回调地址。如果不设置，后续需要手动指定。Webhook 最终地址为 `https://<你的Vercel域名>/api/webhook`。
    ![oSJRB.png](/img/img_12.png)
3.  **获取个人 Token**:
    *   部署完成后，在浏览器中访问 `https://<你的Vercel域名>/api/setWebhook?key=<你设置的key>` 来设置回调。
    *   然后与你的机器人对话，发送 `/token` 命令，机器人会返回一长串加密的个人 Token。
4.  **发送消息**:
    *   现在你可以通过请求 `https://<你的Vercel域名>/api/index?token=<你的个人Token>&message=你好` 来给自己发送消息。

### 选项 B：通过 EdgeOne Page Functions 部署

EdgeOne 是腾讯云推出的边缘一体化安全与加速平台，其 Page Functions 功能同样可以托管本项目。
![edge_image](/img/edge_image_1.png)
1.  **一键部署 (推荐)**:
    *   点击项目顶部的 **使用 EdgeOne Pages 部署** 按钮。
    *   授权后，在项目创建页面，EdgeOne 会自动为你填充大部分配置。
    *   在 **环境变量** 部分，填入 `token` 和 `sign_key`。
    *   **重要**: 部署启动后，请立即进入项目 "设置" -> "环境变量" 页面，**手动添加**第三个环境变量 `key`。
    *   **环境变量说明**:
        *   `token`: **【必填】** 你的 Telegram Bot Token。
        *   `sign_key`: **【必填】** 加密 `chat_id` 用的密钥。
        *   `key`: **【必填】** 设置 Webhook 用的管理密钥。
2.  **手动部署**:
    *   Fork 本项目到你的 GitHub 账户。
    *   在 EdgeOne 控制台新建 Pages 项目，关联你 Fork 的仓库。
    *   **输出目录** 填写 `edge_deploy`。
    *   手动添加上述三个环境变量。
3.  **获取个人 Token**:
    *   部署成功后，在浏览器中访问 `https://<你的Pages域名>/setWebhook?key=<你设置的key>` 设置回调。
    *   与你的机器人对话，发送 `/token` 命令，获取个人 Token。
4.  **发送消息**:
    *   通过访问 `https://<你的Pages域名>/sendMessage?token=<你的个人Token>&message=你好` 发送消息。
    *   API 详情可参考 `edge_deploy/edge.html`。

## Vercel 版本

TG 消息推送机器人,基于 vercel 函数 和 Edgeone 边缘函数 搭建的TG消息推送机器人，无需服务器。

## 搭建教程
### Deploy to Vercel
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTgMessage&env=token,sign_key,key&project-name=tg-message&repo-name=tg-message&demo-title=TG%20Message&demo-url=https%3A%2F%2Ftg-message.vercel.app%2F)
### 建立 TG 机器人

1.首先关注 [BotFather](https://t.me/BotFather)

2. 创建机器人,关注 BotFather 之后,发送 `/newboot` 开始创建 Bot 第一次输入机器人名称,第二次输入机器人 `username` 需要以 `bot` 结尾
   ![oEENc.png](/img/img.png)

**3.获取机器人 token**

创建成功之后会发送一条消息给你，里面就包含了 `token`

![oEGEr.png](/img/img_1.png)

**设置机器人 Command**
设置获取 token 命令 首先给 BotFather 发送 `/mybots`,然后点击你刚才创建的机器人,再点击 `Edit Bot`, 继续点击 `Edit Commands`。 然后输入

```
token - 获取token
```

这样就设置好了一个 `commands`

![oEQIM.png](/img/img_2.png)
![oE0FG.png](/img/img_3.png)
![oEcR1.png](/img/img_4.png)
![oEd9I.png](/img/img_5.png)


## 部署到 Vercel

点击首页的 Deploy 跳到 vercel
![oSgul.png](/img/img_10.png)

输入项目名，然后确认

![oSpFg.png](/img/img_11.png)

确认之后会直接部署到 vercel

### 设置环境变量

vercel 部署好了之后，然后设置环境变量

在控制台点击你创建好的项目，然后点击设置，添加环境变量

![设置vercel 环境变量](/img/img_12.png)

```
需要设置4个环境变量，1个是必填的

token: bot 机器人的token
sign_key: 加密 chat_id 需要用到，不设置默认为 abc
url: webhook 回调地址, 不设置的话请求 setWebhook 时需要手动加参数， webhook url 地址为：https://你的域名/webhook
key: 设置 webhook 的请求参数
```

![oSJRB.png](/img/img_12.png)

上面的环境变量设置好了之后，可能不会立马生效，你可以重新构建一下函数

![oSP9s.png](/img/img_13.png)

### 设置回调
设置 webhook ，可以直接通过浏览器请求来设置

webhook地址为：`https://你的域名/webhook`

浏览器窗口打开：`https://你的域名/setwebhook?key=环境变量设置的KEY&url=你的webhook地址`

`code` 返回 200 就是设置成功了~
