<?php
header('content-type: application/json');
$type = $_REQUEST['type'] ?? 'message';
$token = $_REQUEST['token'] ?? null;
$message = $_REQUEST['message'] ?? '';

$bot = new Bot();
// webhook
if ($type === 'webhook') {
    // 获取/token 命令，获取聊天 id
    $data = json_decode(file_get_contents("php://input"), true);
    $message = $data['message']['text'] ?? '';
    if ($message === '/token') {
        $chat_id = $data['message']['chat']['id'];
        $bot->sendMessage(['text' => $bot->encryption($chat_id), 'chat_id' => $chat_id]);
    }
    echo json_encode(['code' => 200, 'message' => 'success']);
} else {
    if (is_null($token)) {
        echo json_encode(['code' => 422, 'message' => 'token 不能为空']);
    } else {
        // 发送消息
        $chat_id = $bot->decryption($token);
        $ret = $bot->sendMessage(['text' => $message, 'chat_id' => $chat_id]);
        if ($ret['ok']) {
            echo json_encode(['code' => 200, 'message' => 'success']);
        } else {
            echo json_encode(['code' => 422, 'message' => 'error']);
        }
    }
}

class Bot
{
    // chat_id sign key
    public string $key = "abc";
    //Bot Token
    public string $token = "1679016407:AAEHII057c26C5_vY8tSLbO8G6mnyXUOYbM";

    public function sendMessage($data): array
    {
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => sprintf('https://api.telegram.org/bot%s/sendMessage', $this->token),
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

    public function encryption($chat_id): string
    {
        return base64_encode($this->key . $chat_id);
    }

    public function decryption($text): string
    {
        return substr(base64_decode($text), strlen($this->key));
    }
}