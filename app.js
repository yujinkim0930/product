import express from 'express';
import connect from './schemas/index.js';

const app = express();
const PORT = 3000;

connect();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(PORT, '포트로 서버가 열렸어요!');
});
