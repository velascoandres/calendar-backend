import { Request } from 'express';


export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
}


export type LoginPayload = Pick<IUser, 'email' | 'password'>;
export type RequestWithUser = Request & { user?: UserPayload };
export type UserPayload = { uid: string; name: string; };