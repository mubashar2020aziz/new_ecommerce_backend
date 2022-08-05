import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import express from 'express';
const app = express();

import connection from './config/db.mjs';
import router from './routes/user.mjs';

import User from './models/modeluser.mjs';
// middleware
app.use(express.json());

const port = process.env.PORT;
app.use('/', router);

connection();
User();

app.listen(port, (req, res) => {
  console.log('running the server:' + port);
});
