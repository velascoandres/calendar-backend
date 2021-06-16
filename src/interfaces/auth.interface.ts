export interface IUser {
    id?: string;
    name: string;
    email: string;
    password: string;
}


export type LoginPayload = Pick<IUser, 'email' | 'password'>;