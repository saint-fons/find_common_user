import bodyParser = require('body-parser');
import express = require('express');
import { validationResult, body } from 'express-validator';
import { readFileSync } from 'fs';
import cors from 'cors';

interface User {
  email: string;
  number: string;
}

const app = express();
const port = 3000;

app.use(bodyParser.json());

let currentRequestTimeout: NodeJS.Timeout | null = null;
const jsonData = readFileSync('data.json', 'utf8');
const users: User[] = JSON.parse(jsonData);

app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3001', // Замените на URL вашего фронтенд-приложения
  })
);

app.post(
  '/search',
  [
    // Валидация email как обязательного поля
    body('email').isEmail().withMessage('Некорректный email'),

    // Валидация number как опционального поля
    body('number').optional().isNumeric().withMessage('Некорректный number'),
  ],
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, number } = req.body;

    const foundUsers = users.filter((user: User) => {
      if (email && number) {
        return user.email === email && user.number === number;
      } else if (email) {
        return user.email === email;
      } else if (number) {
        return user.number === number;
      }
      return false;
    });

    // Устанавливаем задержку обработки запроса в 5 секунд
    currentRequestTimeout = setTimeout(() => {
      res.json(foundUsers);
    }, 5000);
  }
);

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
