import bodyParser = require('body-parser');
import express = require('express');
import { validationResult, body, ValidationError } from 'express-validator';
import cors from 'cors';
const i18next = require('i18next');
const { readFileSync } = require('fs');
const i18nextMiddleware = require('i18next-express-middleware');
const translationEn = JSON.parse(readFileSync('./locales/en/translation.json', 'utf8'));
const translationRu = JSON.parse(readFileSync('./locales/ru/translation.json', 'utf8'));

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
const port = 3000;

app.use(bodyParser.json());

let currentRequestTimeout: NodeJS.Timeout | null = null;
const jsonData = readFileSync('data.json', 'utf8');
const users: any = JSON.parse(jsonData);

app.use(cors());

app.use(
  cors({
    origin: 'http://localhost:3001',
  })
);

app.use(i18nextMiddleware.handle(i18next)); // Добавьте эту строку

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
      const validationErrors: any = errors.array().map((error: ValidationError) => ({
        type: 'field',
        value: '',
        msg: i18next.t(error.msg), // Используйте req.t для перевода сообщения
        path: '',
        location: 'body',
      }));

      return res.status(400).json({ errors: validationErrors });
    }

    const { email, number } = req.body;

    const foundUsers = users.filter((user: any) => {
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

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
