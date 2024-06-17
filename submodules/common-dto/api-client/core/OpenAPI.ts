import type { ApiRequestOptions } from './ApiRequestOptions';
import { ApiResult } from './ApiResult';

export type ResponsePostprocessor = (
    request: ApiRequestOptions,
    apiResult: ApiResult,
    config: OpenAPIConfig,
) => Promise<string | object | undefined>;

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: 'include' | 'omit' | 'same-origin';
    TOKEN?: string | Resolver<string> | undefined;
    USERNAME?: string | Resolver<string> | undefined;
    PASSWORD?: string | Resolver<string> | undefined;
    HEADERS?: Headers | Resolver<Headers> | undefined;
    ENCODE_PATH?: ((path: string) => string) | undefined;

    responsePostprocessor?: ResponsePostprocessor;
};

export const OpenAPI: OpenAPIConfig = {
    BASE: '',
    VERSION: '1.0',
    WITH_CREDENTIALS: false,
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
};
