import { IUser } from './../interfaces';
import { Schema, model } from 'mongoose';

const schema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});


const UserModel = model<IUser>('User', schema);


export { UserModel };
