## TG Bot

TG 消息推送机器人,基于 vercel 函数搭建的TG消息推送机器人，无需服务器。

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
