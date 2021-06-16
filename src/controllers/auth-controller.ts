import { Request, Response } from 'express';

import { IUser, LoginPayload, ICommonResponse } from '../interfaces';

const createUser = (req: Request, res: Response<ICommonResponse | IUser>): Response<ICommonResponse | IUser> => {


    const { email, name, password } = req.body as IUser;

    if (name.length < 5) {
        return res.json(
            {
                ok: false,
                msg: 'El nombre debe ser de 5 letras',
            }
        );
    }

    return res.json(
        {
            ok: true,
            msg: 'registro',
            email,
            name,
            password,
        }
    );
};


const renewToken = (req: Request, res: Response<{ ok: boolean, msg: string }>): void => {
    res.json({ ok: true, msg: 'renewToken' });
};


const login = (req: Request, res: Response<ICommonResponse | LoginPayload>): Response<ICommonResponse | LoginPayload> => {


    const { email, password } = req.body as LoginPayload;


    return res.json(
        {
            ok: true,
            msg: 'login',
            email,
            password,
        }
    );
};

export {
    createUser,
    renewToken,
    login,
};
