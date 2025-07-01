import Bot from './bot.js';

export async function onRequest(context) {
    const { request, env } = context;
    const bot = new Bot(env);

    if (request.method !== 'POST') {
        return new Response('Please use POST method', { status: 405 });
    }

    try {
        const data = await request.json();
        const message = data.message?.text ?? '';

        if (message === '/token') {
            const chat_id = data.message.chat.id;
            await bot.sendMessage({ text: bot.encryption(chat_id), chat_id: chat_id });
        }
    } catch (e) {
        // Log the error but still return a success response to Telegram
        // to avoid repeated webhook calls.
        console.error(e);
    }
    
    // Always return a success response to Telegram
    return new Response(JSON.stringify({ code: 200, message: 'success' }), {
        headers: { 'Content-Type': 'application/json' }
    });
} 