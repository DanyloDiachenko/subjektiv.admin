export type ApiRequestOptions = {
    readonly method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH';
    readonly url: string;
    readonly path?: Record<string, string | number | undefined>;
    readonly cookies?: Record<string, string>;
    readonly headers?: Record<string, string | number | undefined>;
    readonly query?: Record<string, unknown>;
    readonly formData?: Record<string, object | string | number>;
    readonly body?: unknown;
    readonly mediaType?: string;
    readonly responseHeader?: string;
    readonly errors?: Record<number, string>;
};
