import { Express } from 'express';

import { authRouter } from './routes/auth';
import { eventRouter } from './routes/events';

export default function (app: Express): void {
    app.use('/api/auth', authRouter);
    app.use('/api/events', eventRouter);
}
