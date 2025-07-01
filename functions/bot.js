class Bot {
    // chat_id sign key
    key;
    //Bot Token
    token;

    constructor(env) {
        this.token = env.token;
        this.key = env.sign_key ?? 'abc';
    }

    async request(method, data) {
        const url = `https://api.telegram.org/bot${this.token}/${method}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async sendMessage(data) {
        return this.request('sendMessage', data);
    }

    async setWebHook(data) {
        return this.request('setWebhook', data);
    }

    encryption(chat_id) {
        const text = this.key + chat_id;
        return Buffer.from(text).toString('base64');
    }

    decryption(text) {
        const decoded = Buffer.from(text, 'base64').toString('ascii');
        return decoded.substring(this.key.length);
    }
}

export default Bot; 