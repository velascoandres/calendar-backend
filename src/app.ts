import express from 'express';

import config from 'config';
import cors from 'cors';


import log from './logger';
import routes from './routes';
import { dbConnection } from './database/config';
// import { deserializeUser } from "./middleware";


const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Directorio publico

app.use('/', express.static(__dirname + './../public'));


app.listen(port, () => {
    log.info(`Server listing at http://${host}:${port}`);
});

routes(app);

dbConnection();

