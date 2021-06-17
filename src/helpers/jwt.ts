import * as jwt from 'jsonwebtoken';
import config from 'config';

import log from './../logger';

const generateJWT = (uid: string, name: string): Promise<string> => {

    return new Promise(
        (resolve, reject) => {

            const secret = config.get('jwtSeed') as string;
            const expiresIn = config.get('accessTokenTtl') as string;
            const payload = { uid, name };
            jwt.sign(
                payload,
                secret,
                {
                    expiresIn,

                },
                (err: Error | null, token: string | undefined) => {
                    if (err) {
                        log.error('Cannot generate the token ', err);
                        reject('Cannot generate the token');
                    }
                    resolve(token as string);
                },

            );
        },
    );

}

export {
    generateJWT,
}
