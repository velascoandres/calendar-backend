import { createUser, login, renewToken } from '../controllers/auth-controller';
import { Router } from 'express';
import { check } from 'express-validator';


const authRouter = Router();


authRouter.post(
    '/', 
    [
        check('email', 'The email is required').not().isEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({min: 6}),
    ],
    login,
);

authRouter.post(
    '/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').not().isEmpty(),
        check('email', 'The email is not valid').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        check('password', 'The password must be at least 6 characters').isLength({min: 6}),
    ],
    createUser,
);

authRouter.get('/renew', renewToken);



export { authRouter };