import Bot from './bot.js';

export async function onRequest(context) {
    const { request, env } = context;
    const bot = new Bot(env);

    let token, message;

    if (request.method === 'POST') {
        const contentType = request.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
            const body = await request.json();
            token = body.token;
            message = body.message;
        } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
            const formData = await request.formData();
            token = formData.get('token');
            message = formData.get('message');
        }
    } else { // GET request
        const url = new URL(request.url);
        token = url.searchParams.get('token');
        message = url.searchParams.get('message');
    }

    if (!token) {
        return new Response(JSON.stringify({ code: 422, message: 'token 不能为空' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 422
        });
    }

    try {
        const chat_id = bot.decryption(token);
        const ret = await bot.sendMessage({ text: message, chat_id: chat_id });

        if (ret.ok) {
            return new Response(JSON.stringify({ code: 200, message: 'success' }), {
                headers: { 'Content-Type': 'application/json' },
                status: 200
            });
        } else {
            return new Response(JSON.stringify({ code: 422, message: ret.description }), {
                headers: { 'Content-Type': 'application/json' },
                status: 422
            });
        }
    } catch (e) {
        return new Response(JSON.stringify({ code: 500, message: 'Token decryption failed or other server error.' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 500
        });
    }
} 