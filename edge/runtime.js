// 建议在腾讯云 EdgeOne 控制台设置以下环境变量
// TG_TOKEN: 你的 Telegram Bot Token
// TG_SIGN_KEY: 用于加密 chat_id 的签名密钥
// ADMIN_KEY: 用于设置 webhook 的管理密钥

/**
 * 向 Telegram Bot API 发送请求的辅助函数
 * @param {string} method API 方法
 * @param {object} data 发送的数据
 */
async function botRequest(method, data) {
    // TG_TOKEN 应该在边缘函数环境变量中配置
    const url = `https://api.telegram.org/bot${TG_TOKEN}/${method}`;
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

/**
 * 发送消息
 * @param {string|number} chat_id
 * @param {string} text
 */
async function sendMessage(chat_id, text) {
    return botRequest('sendMessage', { chat_id, text });
}

/**
 * 设置 Webhook
 * @param {string} webhookUrl
 */
async function setWebhook(webhookUrl) {
    return botRequest('setWebhook', { url: webhookUrl });
}

/**
 * 加密 chat_id，与 PHP 版本逻辑保持一致
 * @param {string} chat_id
 */
function encryption(chat_id) {
    // TG_SIGN_KEY 应该在边缘函数环境变量中配置
    // 在 JavaScript 中, btoa 等同于 base64_encode
    return btoa(TG_SIGN_KEY + chat_id);
}

/**
 * 解密 token 获取 chat_id，与 PHP 版本逻辑保持一致
 * @param {string} text
 */
function decryption(text) {
    // TG_SIGN_KEY 应该在边缘函数环境变量中配置
    // 在 JavaScript 中, atob 等同于 base64_decode
    const decoded = atob(text);
    return decoded.substring(TG_SIGN_KEY.length);
}

/**
 * 主处理函数
 * @param {Request} request
 */
async function handleRequest(request) {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');

    try {
        switch (type) {
            // 发送消息逻辑
            case 'sendMessage': {
                const token = url.searchParams.get('token');
                const message = url.searchParams.get('message') || '';

                if (!token) {
                    return new Response(JSON.stringify({ code: 422, message: 'token 不能为空' }), {
                        headers: { 'content-type': 'application/json' },
                        status: 422
                    });
                }

                const chat_id = decryption(token);
                const tgResponse = await sendMessage(chat_id, message);
                const ret = await tgResponse.json();

                if (ret.ok) {
                    return new Response(JSON.stringify({ code: 200, message: 'success' }), {
                        headers: { 'content-type': 'application/json' }
                    });
                } else {
                    return new Response(JSON.stringify({ code: 422, message: ret.description }), {
                        headers: { 'content-type': 'application/json' },
                        status: 422
                    });
                }
            }

            // 设置 Webhook 逻辑
            case 'setWebhook': {
                const key = url.searchParams.get('key');
                // ADMIN_KEY 应该在边缘函数环境变量中配置
                if (key !== ADMIN_KEY) {
                     return new Response(JSON.stringify({ code: 422, message: '设置秘钥错误' }), {
                        headers: { 'content-type': 'application/json' },
                        status: 422
                    });
                }

                // Webhook URL 指向此函数自身，并带上 type=webhook 参数
                const webhookUrl = url.searchParams.get('url') || `https://${url.hostname}${url.pathname}?type=webhook`;
                
                const tgResponse = await setWebhook(webhookUrl);
                const ret = await tgResponse.json();

                if (ret.ok) {
                    return new Response(JSON.stringify({ code: 200, message: `设置成功: ${webhookUrl}` }), {
                        headers: { 'content-type': 'application/json' }
                    });
                } else {
                    return new Response(JSON.stringify({ code: 422, message: ret.description }), {
                        headers: { 'content-type': 'application/json' },
                        status: 422
                    });
                }
            }
            
            // 处理 Telegram 回调逻辑
            case 'webhook': {
                 if (request.method !== 'POST') {
                    return new Response('Method Not Allowed', { status: 405 });
                 }
                const data = await request.json();
                const messageText = data.message?.text || '';
                
                if (messageText === '/token') {
                    const chat_id = data.message.chat.id;
                    const token = encryption(String(chat_id));
                    // 将加密后的 token 发回给用户
                    await sendMessage(chat_id, `你的专属 token 是: ${token}`);
                }
                
                return new Response(JSON.stringify({ code: 200, message: 'success' }), {
                    headers: { 'content-type': 'application/json' }
                });
            }

            // 默认行为，返回帮助信息
            default:
                const ip = request.eo.clientIp || '';
                return new Response(JSON.stringify({ 
                    ip, 
                    message: "TG Bot 边缘函数。请使用 'type' 参数调用不同功能。",
                    usage: {
                        sendMessage: `${url.origin}${url.pathname}?type=sendMessage&token=<your_token>&message=<your_message>`,
                        setWebhook: `${url.origin}${url.pathname}?type=setWebhook&key=<admin_key>&url=<webhook_url(optional)>`,
                        get_token_guide: "请在 Telegram 聊天中向你的机器人发送 /token 命令获取推送 token。"
                    }
                }), {
                    headers: { 'content-type': 'application/json' },
                });
        }
    } catch (e) {
        return new Response(e.toString(), { status: 500 });
    }
}

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});