const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Временное хранение пользователей (позже заменим на БД)
let users = [];
let emailCodes = [];

// Генерация 6-значного кода
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Проверка на существование пользователя
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Генерация кода подтверждения
    const code = generateCode();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 минут

    // Сохраняем код (временно в памяти)
    emailCodes.push({
      email,
      code,
      expires,
      password: await bcrypt.hash(password, 10) // хешируем пароль
    });

    // TODO: Отправка email через AWS SES
    console.log(`Код для ${email}: ${code}`);

    res.json({ 
      message: 'Код подтверждения отправлен на email',
      email: email // для тестирования
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/verify
router.post('/verify', async (req, res) => {
  try {
    const { email, code } = req.body;

    // Найти код подтверждения
    const emailCodeIndex = emailCodes.findIndex(
      ec => ec.email === email && ec.code === code && ec.expires > new Date()
    );

    if (emailCodeIndex === -1) {
      return res.status(400).json({ error: 'Неверный или истекший код' });
    }

    const emailCodeData = emailCodes[emailCodeIndex];

    // Создать пользователя
    const newUser = {
      id: Date.now(),
      email: emailCodeData.email,
      password: emailCodeData.password,
      createdAt: new Date()
    };

    users.push(newUser);

    // Удалить использованный код
    emailCodes.splice(emailCodeIndex, 1);

    // Создать JWT токен
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Регистрация успешна!',
      token,
      user: {
        id: newUser.id,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Найти пользователя
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }

    // Проверить пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }

    // Создать JWT токен
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Вход успешен!',
      token,
      user: {
        id: user.id,
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/auth/users (для тестирования)
router.get('/users', (req, res) => {
  res.json({ 
    users: users.map(u => ({ id: u.id, email: u.email, createdAt: u.createdAt })),
    codes: emailCodes.length
  });
});

module.exports = router;