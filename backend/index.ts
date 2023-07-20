import bodyParser = require('body-parser');
import express = require('express');
import { validationResult, body, ValidationError } from 'express-validator';
import cors from 'cors';
import { UserInterface } from './ServerTypes';
const i18next = require('i18next');
const { readFileSync } = require('fs');
const i18nextMiddleware = require('i18next-express-middleware');
const translationEn = JSON.parse(readFileSync('./locales/en/translation.json', 'utf8'));
const translationRu = JSON.parse(readFileSync('./locales/ru/translation.json', 'utf8'));
require('dotenv').config(); // Загрузка переменных окружения из файла .env

i18next.init({
  lng: 'en',
  resources: {
    en: {
      translation: translationEn,
    },
    ru: {
      translation: translationRu,
    },
  },
});

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let currentRequestTimeout: NodeJS.Timeout | null = null;
let users: UserInterface[] = [];

try {
  const jsonData = readFileSync('data.json', 'utf8');
  users = JSON.parse(jsonData);
} catch (error) {
  console.error('Ошибка чтения файла data.json:', error.message);
  process.exit(1); // Завершение работы при возникновении ошибки чтения файла
}

app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

app.use(i18nextMiddleware.handle(i18next));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Произошла ошибка:', err.message);
  res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.post(
  '/search',
  [
    body('email').isEmail().withMessage('validationErrors.email'),
    body('number').optional({ checkFalsy: true }).isNumeric().withMessage('validationErrors.number'),
  ],
  (req: express.Request, res: express.Response) => {
    const acceptLanguage = req.headers['accept-language'];
    let lng = 'en'; // Язык по умолчанию

    if (acceptLanguage) {
      const languages = acceptLanguage.split(',');
      const languageParts = languages[0].split(';');
      lng = languageParts[0];
    }

    i18next.changeLanguage(lng); // Установка языка в соответствии с предпочитаемым языком клиента

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationErrors: ValidationError[] = errors.array().map((error: ValidationError) => ({
        type: 'field',
        value: '',
        msg: i18next.t(error.msg),
        path: '',
        location: 'body',
      }));

      return res.status(400).json({ errors: validationErrors });
    }

    const { email, number } = req.body;

    const foundUsers = users.filter((user: UserInterface) => {
      if (email) {
        if (number) {
          return user.email === email && user.number === number;
        } else {
          return user.email === email;
        }
      }
      return false;
    });

    currentRequestTimeout = setTimeout(() => {
      res.json(foundUsers);
    }, 5000);
  }
);

const server = app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});

process.on('SIGINT', () => {
  console.log('Сервер завершает работу...');
  clearTimeout(currentRequestTimeout);
  server.close(() => {
    console.log('Сервер корректно завершен.');
    process.exit(0);
  });
});
