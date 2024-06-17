import { ApiError } from './ApiError';
import { ApiRequestOptions } from './ApiRequestOptions';
import { ApiResult } from './ApiResult';
import { CancelablePromise, OnCancel } from './CancelablePromise';
import { OpenAPIConfig } from './OpenAPI';

const APPLICATION_JSON_TYPE = 'application/json';
const CONTENT_TYPE = 'Content-Type';

export const isDefined = <T>(
    value: T | null | undefined,
): value is Exclude<T, null | undefined> => {
    return value !== undefined && value !== null;
};

export const isString = (value: unknown): value is string => {
    return typeof value === 'string';
};

export const isStringWithValue = (value: unknown): value is string => {
    return isString(value) && value !== '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isBlob = (value: any): value is Blob => {
    return (
        typeof value === 'object' &&
        typeof value.type === 'string' &&
        typeof value.stream === 'function' &&
        typeof value.arrayBuffer === 'function' &&
        typeof value.constructor === 'function' &&
        typeof value.constructor.name === 'string' &&
        /^(Blob|File)$/.test(value.constructor.name) &&
        /^(Blob|File)$/.test(value[Symbol.toStringTag])
    );
};

export const isFormData = (value: unknown): value is FormData => {
    return value instanceof FormData;
};

export const base64 = (string_: string): string => {
    try {
        return btoa(string_);
    } catch {
        return Buffer.from(string_).toString('base64');
    }
};

export const getQueryString = (parameters: Record<string, unknown>): string => {
    const qs: string[] = [];

    const append = (key: string, value: unknown) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };

    const process = (key: string, value: unknown) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                for (const v of value) {
                    process(key, v);
                }
            } else if (typeof value === 'object' && value !== null) {
                for (const [k, v] of Object.entries(value)) {
                    process(`${key}[${k}]`, v);
                }
            } else {
                append(key, value);
            }
        }
    };

    for (const [key, value] of Object.entries(parameters)) {
        process(key, value);
    }

    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }

    return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
    const encoder = config.ENCODE_PATH || encodeURI;

    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring: string, group: string) => {
            // eslint-disable-next-line no-prototype-builtins
            if (options.path?.hasOwnProperty(group)) {
                return encoder(String(options.path[group]));
            }
            return substring;
        });

    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
    if (options.formData) {
        const formData = new FormData();

        const process = (key: string, value: unknown) => {
            if (isString(value) || isBlob(value)) {
                formData.append(key, value);
            } else {
                formData.append(key, JSON.stringify(value));
            }
        };

        for (const [key, value] of Object.entries(options.formData).filter(([_, value]) =>
            isDefined(value),
        )) {
            if (Array.isArray(value)) {
                for (const v of value) process(key, v);
            } else {
                process(key, value);
            }
        }

        return formData;
    }
    return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const resolve = async <T>(
    options: ApiRequestOptions,
    resolver?: T | Resolver<T>,
): Promise<T | undefined> => {
    if (typeof resolver === 'function') {
        return (resolver as Resolver<T>)(options);
    }
    return resolver;
};

export const getHeaders = async (
    config: OpenAPIConfig,
    options: ApiRequestOptions,
): Promise<Headers> => {
    const token = await resolve(options, config.TOKEN);
    const username = await resolve(options, config.USERNAME);
    const password = await resolve(options, config.PASSWORD);
    const additionalHeaders = await resolve(options, config.HEADERS);

    const headers = Object.entries({
        Accept: APPLICATION_JSON_TYPE,
        ...additionalHeaders,
        ...options.headers,
    })
        .filter(([_, value]) => isDefined(value))
        .reduce(
            (headers, [key, value]) => ({
                ...headers,
                [key]: String(value),
            }),
            {} as Record<string, string>,
        );

    if (isStringWithValue(token)) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (isStringWithValue(username) && isStringWithValue(password)) {
        const credentials = base64(`${username}:${password}`);
        headers['Authorization'] = `Basic ${credentials}`;
    }

    if (options.body) {
        if (options.mediaType) {
            headers[CONTENT_TYPE] = options.mediaType;
        } else if (isBlob(options.body)) {
            headers[CONTENT_TYPE] = options.body.type || 'application/octet-stream';
        } else if (isString(options.body)) {
            headers[CONTENT_TYPE] = 'text/plain';
        } else if (!isFormData(options.body)) {
            headers[CONTENT_TYPE] = APPLICATION_JSON_TYPE;
        }
    }

    return new Headers(headers);
};

export const getRequestBody = (
    options: ApiRequestOptions,
): string | Blob | FormData | undefined => {
    if (options.body !== undefined) {
        if (options.mediaType?.includes('/json')) {
            return JSON.stringify(options.body);
        } else if (isString(options.body) || isBlob(options.body) || isFormData(options.body)) {
            return options.body;
        } else {
            return JSON.stringify(options.body);
        }
    }
    return undefined;
};

export const sendRequest = async (
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: string | Blob | FormData | undefined,
    formData: FormData | undefined,
    headers: Headers,
    onCancel: OnCancel,
): Promise<Response> => {
    const controller = new AbortController();

    const request: RequestInit = {
        headers,
        body: body ?? formData ?? null,
        method: options.method,
        signal: controller.signal,
    };

    if (config.WITH_CREDENTIALS) {
        request.credentials = config.CREDENTIALS;
    }

    onCancel(() => controller.abort());

    // @ts-ignore - to fix this error - you can just include DOM library in tsconfig.json
    return await fetch(url, request);
};

export const getResponseHeader = (
    response: Response,
    responseHeader?: string,
): string | undefined => {
    if (responseHeader) {
        const content = response.headers.get(responseHeader);
        if (isString(content)) {
            return content;
        }
    }
    return undefined;
};

export const getResponseBody = async (response: Response): Promise<undefined | string | object> => {
    if (response.status !== 204) {
        try {
            const contentType = response.headers.get(CONTENT_TYPE);
            if (contentType) {
                const jsonTypes = [APPLICATION_JSON_TYPE, 'application/problem+json'];
                const isJSON = jsonTypes.some((type) => contentType.toLowerCase().startsWith(type));
                if (isJSON) {
                    return (await response.json()) as undefined | string | object;
                } else {
                    // TODO - handle blob content type, because for now it converts all blobs to text
                    return await response.text();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    return undefined;
};

export const throwApiExceptions = (options: ApiRequestOptions, result: ApiResult): void => {
    if (!result.ok) {
        const errorStatus = result.status;
        const errorStatusText = result.statusText;
        const errorBody = (() => {
            try {
                return JSON.stringify(result.body, null, 2);
            } catch {
                return;
            }
        })();

        throw new ApiError(
            options,
            result,
            `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`,
        );
    }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions,
): CancelablePromise<T> => {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options);

            if (!onCancel.isCancelled) {
                const response = await sendRequest(
                    config,
                    options,
                    url,
                    body,
                    formData,
                    headers,
                    onCancel,
                );
                const responseBody = await getResponseBody(response);
                const responseHeader = getResponseHeader(response, options.responseHeader);
                const dataToRespond = responseHeader ?? responseBody;

                const result = config.responsePostprocessor
                    ? await config.responsePostprocessor(
                          options,
                          {
                              url,
                              ok: response.ok,
                              status: response.status,
                              statusText: response.statusText,
                              body: dataToRespond,
                          },
                          config,
                      )
                    : dataToRespond;

                return resolve(result as T);
            }
        } catch (error) {
            reject(error);
        }
    });
};
