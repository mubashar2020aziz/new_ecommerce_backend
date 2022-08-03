import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import connection from './config/db.mjs';

app.use(bodyParser.json());

const port = process.env.PORT;

connection();

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'yes',
  });
});

app.post('/data', (req, res) => {
  res.status(200).json({
    status: true,
    message: req.body,
  });
});
app.listen(port, (req, res) => {
  console.log('running the server:' + port);
});
