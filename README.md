[一键部署 vercel](httpshttps://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage)

[![使用 EdgeOne Pages 部署](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage)

## 技术赞助
本项目的 CDN 加速和安全防护由 [Tencent EdgeOne](https://edgeone.ai/) 赞助。


<a href="https://edgeone.ai/">
  <img width="200" src="https://edgeone.ai/media/34fe3a45-492d-4ea4-ae5d-ea1087ca7b4b.png" alt="Tencent EdgeOne">
</a>

## Edge Functions 版本

本项目提供一个使用腾讯云边缘函数（Edge Functions）的实现版本。

### 部署指南

1.  **访问EdgeOne边缘函数控制台**:
2.  **创建边缘函数**: 在控制台中创建一个新的边缘函数。
3.  **复制代码**: 将 `edge/runtime.js` 文件中的所有代码粘贴到函数代码编辑器中。
4.  **配置环境变量**: 在函数设置中，添加以下三个环境变量：
    *   `TG_TOKEN`: 你的 Telegram Bot Token。
    *   `TG_SIGN_KEY`: 一个自定义的字符串，用于加密 chat\_id。
    *   `ADMIN_KEY`: 一个自定义的字符串，用作设置 webhook 时的管理密钥。
5.  **配置触发器**:
    *   创建一个触发器来将函数绑定到你的域名或一个子路径。
    *   例如, `example.com/tg-bot/*`。
6.  **部署并使用**: 保存并部署函数。详细的使用方法请参考 `edge.html`。

## 功能

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
