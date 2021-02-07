## TG Bot

TG 消息推送机器人,基于 vercel 函数搭建的TG消息推送机器人，无需服务器。

## 搭建教程
### Deploy to Vercel
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fanhao%2FTGMessage)
### 建立 TG 机器人

1.首先关注 [BotFather](https://t.me/BotFather)

2. 创建机器人,关注 BotFather 之后,发送 `/newboot` 开始创建 Bot 第一次输入机器人名称,第二次输入机器人 `username` 需要以 `bot` 结尾
   ![oEENc.png](https://ooo.0x0.ooo/2021/02/07/oEENc.png)

**3.获取机器人 token**

创建成功之后会发送一条消息给你，里面就包含了 `token`

![oEGEr.png](https://ooo.0x0.ooo/2021/02/07/oEGEr.png)

**设置机器人 Command**
设置获取 token 命令 首先给 BotFather 发送 `/mybots`,然后点击你刚才创建的机器人,再点击 `Edit Bot`, 继续点击 `Edit Commands`。 然后输入

```
token - 获取token
```

这样就设置好了一个 `commands`

![oEQIM.png](https://ooo.0x0.ooo/2021/02/07/oEQIM.png)
![oE0FG.png](https://ooo.0x0.ooo/2021/02/07/oE0FG.png)
![oEcR1.png](https://ooo.0x0.ooo/2021/02/07/oEcR1.png)
![oEd9I.png](https://ooo.0x0.ooo/2021/02/07/oEd9I.png)

### 克隆本仓库

上面创建好机器人之后，fork 本参考到你的 github 里面 需要修改一个文件配置. `api/index.php`
主要是修改 机器人 token ，在 38 行，把 token 换成你的机器人 token 可以通过 github 在线编辑代码直接修改。

![oEYyF.png](https://ooo.0x0.ooo/2021/02/07/oEYyF.png)

### 创建 Vercel

Vercel：https://vercel.com/  
可以直接使用 github 账户登录 创建好了账户之后在控制台选择 `New Project`

![oE2El.png](https://ooo.0x0.ooo/2021/02/07/oE2El.png)

然后找到你 fork 的仓库，点击 `import`，就会自动部署了。

![oEXhB.png](https://ooo.0x0.ooo/2021/02/07/oEXhB.png)

部署成功之后，会有免费的域名，然后接下来设置机器人的 webhook.

![oEIjK.png](https://ooo.0x0.ooo/2021/02/07/oEIjK.png)

### 设置 WebHook
设置机器人 webhook, 把下面的 token 和 域名换成你的(把{}去掉)， 然后执行 `curl

```shell
curl --location --request POST 'https://api.telegram.org/bot{你的token}/setWebhook' \
--form 'url="https://{你的域名}/api?type=webhook"'
```
参考文档：https://core.telegram.org/bots/api#setwebhook

php 执行 set webhook 脚本
```php
<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => 'https://api.telegram.org/bot{你的token}/setWebhook',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS => array('url' => 'https://{你的域名}/api?type=webhook'),
));

$response = curl_exec($curl);
```
