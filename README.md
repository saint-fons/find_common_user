<div id="header" align="center">
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Nodejs" alt="Nodejs" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="TypeScript" alt="TypeScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" alt="Git" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original-wordmark.svg" title="CSS" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="express" 
</div>

# Проект "Поиск пользователей по адресу почты и номеру"

### Описание проекта

Проект "Поиск пользователей по адресу почты и номеру" представляет собой веб-приложение с одной страницей, на которой расположена форма для поиска пользователей. Форма содержит два поля: "Email" (обязательное) и "Number" (опциональное), а также кнопку "Submit" для выполнения поискового запроса.

Приложение осуществляет поиск пользователей в предоставленном JSON-файле по заданным критериям (Email и/или номер) на серверной стороне и возвращает соответствующие результаты на клиентскую сторону для отображения.

### Задача заказчика

Поставленная задача заказчика заключается в следующем:

- Разработать веб-приложение с одной страницей, содержащей форму для поиска пользователей по Email и номеру.
- Обязательные поля формы: "Email" (обязательное) и "Number" (опциональное).
- При нажатии на кнопку "Submit", отправить запрос на сервер для выполнения поиска пользователей по заданным критериям.
- Имитировать задержку обработки запроса на сервере в 5 секунд для эмуляции долгой обработки.
- Обеспечить обязательную валидацию полей "Email" и "Number". Валидацию можно реализовать на клиентской или серверной стороне.
- Добавить маску на поле "Number", чтобы номер отображался с дефисами каждые два знака (например, 22-11-22, 83-03-47).
- Технологии: React или Vue (с типизацией на выбор) для фронтенда, Node.js с обязательной типизацией для бекенда.
- Использование библиотек на усмотрение разработчика.
  Деплой не обязателен, достаточно предоставить Readme с инструкцией по запуску проекта.

# Особенности проекта

### Локализация

Проект включает в себя поддержку локализации с помощью библиотеки i18next. Это позволяет предоставить приложение на разных языках, что повышает удобство использования для пользователей разных стран и культур. В нашем проекте реализована поддержка английского и русского языков. Локализованные строки хранятся в отдельных файлах для каждого языка, что облегчает их добавление и изменение.

### Эффективная обработка запросов

Для имитации долгой обработки запросов на сервере, мы добавили задержку в 5 секунд при поиске пользователей. Это дает пользователю визуальное обратное сообщение о выполнении запроса и улучшает опыт использования приложения. При этом, при повторном запросе с клиентской стороны, предыдущий запрос будет отменен, что обеспечивает эффективное управление запросами и исключает возможность получения устаревших данных.

### Маска для поля "Number"

Для удобства пользователей мы добавили маску для поля "Number", которая отображает номер с дефисами после каждых двух знаков (например, 22-11-22, 83-03-47). Это позволяет легко вводить номер в правильном формате, что минимизирует возможность ошибок при вводе данных.

### Типизация для безопасности кода

Использование TypeScript для фронтенда и бекенда обеспечивает более высокую степень безопасности кода, предотвращает ошибки и упрощает разработку, облегчая поддержку проекта в будущем.

### Установка и запуск проекта

### !установка выполнялась на версии node 18.12.1
Для установки и запуска проекта выполните следующие шаги:

- Клонируйте репозиторий с проектом на свой компьютер.
- Перейдите в корневую директорию проекта.
- Установите зависимости для серверной части, выполнив команду:

### cd backend
### npm install
### npm start

- Вернитесь в корневую директорию проекта, затем перейдите в директорию "frontend" и установите зависимости для клиентской части, выполнив команду:

### cd frontend
### npm install
### npm start

- Вернитесь в корневую директорию проекта и выполните команду для запуска приложения:

### npm run dev

- Приложение будет доступно по адресу: http://localhost:3001/
- Фронтенд приложение запустится на 3001, а сервер бэкенда на 3000

# Технологии и зависимости

- Фронтенд: React с использованием TypeScript, библиотека @fluentui/react для UI-компонентов, библиотека react-input-mask для маски поля "Number", react-axios для выполнения запросов к бекенду.
  Бекенд: Node.js с использованием TypeScript, Express для обработки запросов, i18next для локализации, и другие необходимые зависимости.

- Важно! Приложение эмулирует задержку обработки запроса на сервере в 5 секунд. При повторном запросе с клиентской стороны, предыдущий запрос будет отменен.

- Пожалуйста, убедитесь, что JSON-файл с данными пользователей находится в корневой директории проекта с именем "data.json".

# Автор

Проект разработан и создан в рамках тестового задания заказчиком. Автор: Журавлев Иван

# Примечание

При необходимости добавления новых функций или изменений, не стесняйтесь связаться с автором проекта.
