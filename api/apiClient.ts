import { getCookie, setCookie } from "@/api/cookies";
import { AuthApi } from "@/submodules/common-dto/api-client/auth";
import { ApiRequestOptions } from "@/submodules/common-dto/api-client/core/ApiRequestOptions";
import { ApiResult } from "@/submodules/common-dto/api-client/core/ApiResult";
import {
    OpenAPIConfig,
    ResponsePostprocessor,
} from "@/submodules/common-dto/api-client/core/OpenAPI";
import {
    request,
    throwApiExceptions,
} from "@/submodules/common-dto/api-client/core/request";
import { MainApi } from "@/submodules/common-dto/api-client/main";
import { NotificationApi } from "@/submodules/common-dto/api-client/notification";
import { StorageApi } from "@/submodules/common-dto/api-client/storage";
import HttpStatusCodeEnum from "@/submodules/common-dto/constants/httpStatusCode.enum";

export const KEY_TOKEN = "token";
export const KEY_REFRESH_TOKEN = "refresh_token";
export const TOKEN_COOKIE_LIFETIME_DAYS = 1;
export const REFRESH_TOKEN_COOKIE_LIFETIME_DAYS = 30;

function cookieSetter(name: string, value: string, days?: number): void {
    if (!global.document) {
        return;
    }

    const currentValue = getCookie(name);
    if (currentValue === value) {
        return;
    }

    setCookie(name, value, days);
}

class ApiClient {
    readonly auth = new AuthApi({
        BASE: process.env.NEXT_PUBLIC_API_AUTH_URL,
    });

    readonly main = new MainApi({
        BASE: process.env.NEXT_PUBLIC_BACKEND_URL,
    });

    readonly storage = new StorageApi({
        BASE: process.env.NEXT_PUBLIC_STORAGE_URL,
    });

    readonly notification = new NotificationApi({
        BASE: process.env.NEXT_PUBLIC_NOTIFICATION_URL,
    });

    readonly onTokenChangeCallbacks: Array<
        (token: string | undefined) => void
    > = [];

    private currentToken: string | undefined;
    private currentRefreshToken: string | undefined;

    constructor() {
        const catchUnauthorized: ResponsePostprocessor = async (
            requestData: ApiRequestOptions,
            apiResult: ApiResult,
            config: OpenAPIConfig,
        ) => {
            // Pass through if not unauthorized
            if (apiResult.status !== HttpStatusCodeEnum.UNAUTHORIZED) {
                throwApiExceptions(requestData, apiResult);
                return apiResult.body;
            }

            // Pass through if no refresh token
            if (!this.currentRefreshToken) {
                throwApiExceptions(requestData, apiResult);
                return apiResult.body;
            }

            try {
                // Try to refresh token
                const result = await this.auth.auth.authControllerRefreshToken({
                    requestBody: {
                        refreshToken: this.currentRefreshToken,
                    },
                });

                // Set new token
                this.setToken(result.data.idToken);

                // Retry request
                return request(config, requestData);
            } catch (error: unknown) {
                // If any error occurs, logout
                console.warn(`Cannot refresh token, doing logout`);
                console.error(error);

                this.setToken(undefined);

                this.setRefreshToken(undefined);

                // Reload page
                location.reload();
            }
        };

        this.auth.request.config.responsePostprocessor = catchUnauthorized;
        this.main.request.config.responsePostprocessor = catchUnauthorized;
        this.storage.request.config.responsePostprocessor = catchUnauthorized;
        this.notification.request.config.responsePostprocessor =
            catchUnauthorized;
    }

    getToken(): string | undefined {
        return this.currentToken;
    }

    getRefreshToken(): string | undefined {
        return this.currentRefreshToken;
    }

    onTokenChange(callback: (token: string | undefined) => void): void {
        this.onTokenChangeCallbacks.push(callback);
    }

    setToken(token: string | undefined): void {
        if (this.currentToken === token) {
            return;
        }

        token
            ? cookieSetter(KEY_TOKEN, token, TOKEN_COOKIE_LIFETIME_DAYS)
            : cookieSetter(KEY_TOKEN, "");

        this.currentToken = token;
        this.main.request.config.TOKEN = this.currentToken;
        this.auth.request.config.TOKEN = this.currentToken;
        this.storage.request.config.TOKEN = this.currentToken;
        this.notification.request.config.TOKEN = this.currentToken;

        for (const callback of this.onTokenChangeCallbacks) {
            callback(token);
        }
    }

    setRefreshToken(token: string | undefined): void {
        if (this.currentRefreshToken === token) {
            return;
        }

        token
            ? cookieSetter(
                  KEY_REFRESH_TOKEN,
                  token,
                  REFRESH_TOKEN_COOKIE_LIFETIME_DAYS,
              )
            : cookieSetter(KEY_REFRESH_TOKEN, "");

        this.currentRefreshToken = token;
    }
}

const apiClient = new ApiClient();
export default apiClient;
