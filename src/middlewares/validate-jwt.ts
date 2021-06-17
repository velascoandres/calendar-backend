import { Response, NextFunction } from 'express';

import *  as jwt from 'jsonwebtoken';
import config from 'config';

import { ICommonResponse, RequestWithUser, UserPayload } from './../interfaces';




const validateJWT = (req: RequestWithUser, res: Response<ICommonResponse>, next: NextFunction): Response<ICommonResponse> | void => {

    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res
            .status(401)
            .json(
                {
                    ok: false,
                    msg: 'Token is missing',
                },
            );
    }

    try {

        const payload = jwt.verify(
            token,
            config.get('jwtSeed'),
        ) as UserPayload;

        req.user = payload;

    } catch (error) {
        return res.status(401).json(
            {
                ok: false,
                msg: 'Invalid token'
            }
        );
    }


    next();
};

export { validateJWT };
