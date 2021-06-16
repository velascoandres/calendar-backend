import { ValidationError } from 'express-validator';

export interface ICommonResponse {
    ok: boolean;
    msg?: string;
    errors?: Record<string, ValidationError>;
}
