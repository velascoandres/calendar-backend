import express from 'express';
import config from 'config';

import log from './logger';
// import { deserializeUser } from "./middleware";


const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.get('/', (req, res) => {
  res.send('Well done!');
});


app.listen(3000, () => {
  log.info(`Server listing at http://${host}:${port}`);
});
