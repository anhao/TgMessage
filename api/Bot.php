<?php

/**
 * 简单封装 tg bot 请求
 * Class Bot
 * @author Alone88
 * @link https://alone88.cn
 */
class Bot
{
    // chat_id sign key
    private string $key;
    //Bot Token
    private string $token;

    public function __construct()
    {
        $this->token = $_ENV['token'];
        $this->key = $_ENV['sign_key'] ?? 'abc';
    }

    public function request($method, $data)
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => sprintf('https://api.telegram.org/bot%s/%s', $this->token, $method),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => $data,
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response, true);
    }

    public function sendMessage($data): array
    {
        return $this->request('sendMessage', $data);
    }

    public function setWebHook($data)
    {
        return $this->request('setWebhook', $data);
    }

    public function encryption($chat_id): string
    {
        return base64_encode($this->key . $chat_id);
    }

    public function decryption($text): string
    {
        return substr(base64_decode($text), strlen($this->key));
    }

    /**
     * @param string $key
     * @return Bot
     */
    public function setKey(string $key): Bot
    {
        $this->key = $key;
        return $this;
    }

    /**
     * @param string $token
     * @return Bot
     */
    public function setToken(string $token): Bot
    {
        $this->token = $token;
        return $this;
    }
}