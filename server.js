const express = require('express');
const crypto = require('crypto');

const app = express();
const port = process.env.PORT || 3000;

// Ваш секретный ключ
const SECRET_KEY = '32864723874523874628374sdfsdf324234'; // Используйте ваш секретный ключ

app.use(express.json());

app.get('/auth/telegram', (req, res) => {
    const data = req.query;  // Получаем данные, переданные Telegram
    
    // Убираем параметр hash из данных
    const { hash, ...authData } = data;

    // Сортируем параметры по ключу и формируем строку для проверки подписи
    const sortedData = Object.keys(authData)
        .sort()
        .map(key => `${key}=${authData[key]}`)
        .join('\n');
    
    // Вычисляем хеш
    const computedHash = crypto.createHmac('sha256', SECRET_KEY)
        .update(sortedData)
        .digest('hex');

    // Сравниваем полученную подпись с той, что передана
    if (computedHash !== hash) {
        return res.status(400).send('Invalid signature');
    }

    // Если подпись верная, перенаправляем на страницу dashboard
    res.redirect('/dashboard');
});

// Страница dashboard
app.get('/dashboard', (req, res) => {
    res.send('<h1>Welcome to your Dashboard!</h1>');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
