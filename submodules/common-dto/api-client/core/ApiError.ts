import type { ApiRequestOptions } from './ApiRequestOptions';
import type { ApiResult } from './ApiResult';

export interface IApiStandardErrorResponse {
    success: boolean;
    message: string;
    data: Record<string, string>;
}

export class ApiError extends Error {
    public readonly url: string;
    public readonly status: number;
    public readonly statusText: string;
    public readonly request: ApiRequestOptions;
    public readonly response: IApiStandardErrorResponse;

    constructor(
        request: ApiRequestOptions,
        response: ApiResult,
        message: string,
    ) {
        super(message);

        this.name = 'ApiError';
        this.url = response.url;
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response.body as IApiStandardErrorResponse;
        this.request = request;
    }
}
