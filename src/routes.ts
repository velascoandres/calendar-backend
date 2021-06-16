import { Express } from 'express';

import { authRouter } from './routes/auth';

export default function (app: Express): void {
    app.use('/api/auth',authRouter);
}
