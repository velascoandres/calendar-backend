import { Response, Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ICommonResponse } from '../interfaces';


const validateBody = (req: Request, res: Response<ICommonResponse>, next: NextFunction):  Response<ICommonResponse> | void => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(
            {
                ok: false,
                msg: '',
                errors: errors.mapped(),
            }
        );
    } else {
        next();
    }

};

export {
    validateBody,
}


