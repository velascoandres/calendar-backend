import { Response, Request, Router } from 'express';

const authRouter = Router();



authRouter.get('/', (req: Request, res: Response<{ ok: boolean }>): void => {

    res.json({ ok: true });

});

export { authRouter };