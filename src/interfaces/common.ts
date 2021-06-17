import { Response } from 'express';

import { ValidationError } from 'express-validator';

export interface ICommonResponse {
    ok: boolean;
    msg?: string;
    errors?: Record<string, ValidationError>;
}


export type CreateResponse<T> = Response<T | ICommonResponse>;

export type ListResponse<T> = Response<{data: T[], total: number} | ICommonResponse>;

export type UpdateResponse<T> = CreateResponse<T>;

export type DeleteResponse<T> = CreateResponse<T>;

export type GetOneResponse<T> = CreateResponse<T>;
