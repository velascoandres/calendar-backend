import { Request } from 'express';
import config from 'config';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import log from './../logger';
import {
    IUser,
    LoginPayload,
    RequestWithUser,
    UserPayload,
    CreateResponse,
    UserToken,
} from '../interfaces';
import { UserModel } from './../models/user.model';
import { generateJWT } from './../helpers/jwt';


type LoginResponse = CreateResponse<UserToken>;


const createUser = async (req: Request, res: CreateResponse<UserToken>): Promise<CreateResponse<UserToken>> => {


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

        // Generate JWT
        const token = await generateJWT(user.id, user.name);


        return res.json(
            {
                uid: user.id as string,
                name: user.name,
                email: user.email,
                token,
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


const renewToken = async (req: RequestWithUser, res: LoginResponse): Promise<void> => {

    const { uid, name } = req.user as UserPayload;

    try {
        // JWT
        const token = await generateJWT(uid, name);
        res.json({ ok: true, msg: 'renewToken', token, uid, name });

    } catch (error) {
        res.status(404).json({ ok: false, msg: 'Error on regenerate token' });
    }



};



const login = async (req: Request, res: LoginResponse): Promise<LoginResponse> => {


    const { email, password } = req.body as LoginPayload;

    try {

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json(
                {
                    ok: false,
                    msg: 'The user does not exist'
                }
            );
        }

        // Confirm the passwords

        const isValidPassword = compareSync(password, user.password);

        if (!isValidPassword) {

            return res.status(400).json(
                {
                    ok: false,
                    msg: 'Invalid credentials',
                }
            );

        }


        // Generate JWT
        const token = await generateJWT(user.id, user.name);


        return res.json(
            {
                uid: user.id,
                name: user.name,
                email,
                token,
            }
        );

    } catch (error) {

        log.error('Error on Login', error);

        return res.status(500).json(
            {
                ok: false,
                msg: 'Server Error',
            }
        );
    }

};

export {
    createUser,
    renewToken,
    login,
};
