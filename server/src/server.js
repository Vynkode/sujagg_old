import express from 'express';
import bodyParser from 'body-parser';
import { clientDb, db } from '../config/database.js';

const PORT = '8080';
const server = express();

server.use(bodyParser.json());

server.get('/', (req, res) => {
  clientDb
    .query(
      db.Create(db.Collection('subscriptions'), {
        data: { title: 'prueba', description: 'holahola' },
      })
    )
    .then(response => {
      res.json(response['data']);
      console.log(response);
    });
});

server.listen(PORT, () => console.log('Servidor en marcha'));
