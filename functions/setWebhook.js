import Bot from './bot.js';

export async function onRequest(context) {
    const { request, env } = context;
    const bot = new Bot(env);
    const url = new URL(request.url);

    const key = url.searchParams.get('key');

    if (key !== env.key) {
        return new Response(JSON.stringify({ code: 401, message: 'unauthorized' }), {
            headers: { 'Content-Type': 'application/json' },
            status: 401
        });
    }

    // Default webhook URL is the current function's host + /webhook
    const webhookUrl = url.searchParams.get('url') || `https://${url.hostname}/webhook`;
    
    const ret = await bot.setWebHook({ url: webhookUrl });

    if (ret.ok) {
        return new Response(JSON.stringify({ code: 200, message: `Webhook set to ${webhookUrl}` }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } else {
        return new Response(JSON.stringify({ code: 422, message: ret.description }), {
            headers: { 'Content-Type': 'application/json' },
            status: 422
        });
    }
} 