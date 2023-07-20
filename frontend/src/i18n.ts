import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          'searchPage.title': 'Search Page',
          'searchPage.emailLabel': 'Email',
          'searchPage.numberLabel': 'Number',
          'searchPage.noResults': 'No results found.',
          'searchPage.author': 'Author: Your Name',
          'searchPage.search': 'Search',
          'searchPage.emailRequired': 'Email is required',
          'searchPage.emailPlaceholder': 'Enter your e-mail address',
          'searchPage.numberPlaceholder': 'Enter your number',
        },
      },
      ru: {
        translation: {
          'searchPage.title': 'Страница поиска',
          'searchPage.emailLabel': 'Электронная почта',
          'searchPage.numberLabel': 'Номер',
          'searchPage.noResults': 'Результаты не найдены.',
          'searchPage.author': 'Иван Журавлев',
          'searchPage.search': 'Поиск',
          'searchPage.emailRequired': 'Пожалуйста, введите электронную почту',
          'searchPage.emailPlaceholder': 'Введите адрес электронной почты',
          'searchPage.numberPlaceholder': 'Введите номер',
        },
      },
    },
  });

export default i18n;
