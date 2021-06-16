import { Request, Response } from 'express';
import config from 'config';

import log from './../logger';
import { IUser, LoginPayload, ICommonResponse } from '../interfaces';
import { UserModel } from './../models/user.model';

import { genSaltSync, hashSync } from 'bcryptjs';

type CreateUserResponse = Response<Omit<IUser, 'password'> | ICommonResponse>;


const createUser = async (req: Request, res: CreateUserResponse): Promise<CreateUserResponse> => {


    const userBody = req.body as IUser;

    try {

        let user = await UserModel.findOne({ email: userBody.email });

        if (user) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'The email has been taken from another user',
                }
            );
        }

        user = new UserModel(userBody);

        // Encrypt password
        const salt = genSaltSync(config.get('saltWorkFactor'));
        user.password = hashSync(user.password, salt);

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
