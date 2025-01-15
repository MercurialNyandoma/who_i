<?php
// Получаем данные, переданные Telegram
$data = $_GET;

// Проверяем, что данные пришли от Telegram (используя вашу публичную валидацию)
$telegram_token = '7775515402:AAGsWtsMITnqdCaS5iXw6wSZFtTg0Y54faw';  // Замените на ваш токен бота
$hash = $data['hash'];
unset($data['hash']);
ksort($data);
$check_string = '';
foreach ($data as $key => $value) {
    $check_string .= $key . '=' . $value . "\n";
}

// Проверка подписи
$secret = hash('sha256', $telegram_token);
$calculated_hash = hash_hmac('sha256', $check_string, $secret);
if ($calculated_hash !== $hash) {
    exit('Ошибка валидации данных');
}

// Данные пользователя
$user_id = $data['id'];
$first_name = $data['first_name'];
$username = $data['username'];

// Пример: сохраняем данные в сессию или базе данных
session_start();
$_SESSION['user'] = [
    'id' => $user_id,
    'first_name' => $first_name,
    'username' => $username
];

// Редирект на страницу dashboard
header("Location: dashboard.html");
exit();
?>
