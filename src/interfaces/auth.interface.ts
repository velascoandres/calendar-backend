export interface IUser {
    name: string;
    email: string;
    password: string;
}


export type LoginPayload = Pick<IUser, 'email' | 'password'>;