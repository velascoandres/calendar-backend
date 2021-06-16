import { Request, Response } from 'express';

import log from './../logger';

import { IUser, LoginPayload, ICommonResponse } from '../interfaces';

import { UserModel } from './../models/user.model';

const createUser = async (req: Request, res: Response<Omit<IUser, 'password'> | ICommonResponse>):Promise<Response<Omit<IUser, 'password'> | ICommonResponse>> => {


    const userBody = req.body as IUser;

    try {

        let user = await UserModel.findOne({ email: userBody.email });

        if (user){
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'The email has been taken from another user',
                }
            );
        }

        user = new UserModel(userBody);

        await user.save();


        return res.json(
            {
                id: user.id as string,
                name: user.name,
                email: user.email,
            }
        );
    } catch (error) {
        log.error('Error on create user', error);
        return res.status(500).json(
            {
                ok: false,
                msg: 'Server error',
            }
        );
    }
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
