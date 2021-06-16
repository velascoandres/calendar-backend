import { connect } from 'mongoose';
import log from './../logger';
import config from 'config';

const dbConnection = async (): Promise<void> => {
    try {

        await connect(
            config.get('dbUri'),
            {
                useCreateIndex: true,
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        );

        log.info('Database connected');


    } catch (error) {
        log.error('Error on init database ', error);
        throw new Error('Error on init database');
    }
};

export {
    dbConnection,
};
