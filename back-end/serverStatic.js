const express = require("express");
// const { appendFile } = require('fs/promises');
// const jsonParser = express.json();
const path = require('path');  // Require the path module

const app = express();

// middleware

// app.use((_, res, next) => {
//   res.header('Access-Control-Allow-Origin', "*");
//   res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Method', "GET, POST");
//   next();
// });

app.use(express.static(path.join(__dirname, 'public')));

// Разрешаем доступ к index.html
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
