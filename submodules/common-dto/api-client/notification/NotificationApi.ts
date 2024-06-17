/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
import type { OpenAPIConfig } from '../core/OpenAPI';
import { FetchHttpRequest } from '../core/FetchHttpRequest';
import { CognitoEmailService } from './services/CognitoEmailService';
import { NotificationService } from './services/NotificationService';
import { SupportService } from './services/SupportService';
type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;
export class NotificationApi {
    public readonly cognitoEmail: CognitoEmailService;
    public readonly notification: NotificationService;
    public readonly support: SupportService;
    public readonly request: BaseHttpRequest;
    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? '',
            VERSION: config?.VERSION ?? '1.0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.cognitoEmail = new CognitoEmailService(this.request);
        this.notification = new NotificationService(this.request);
        this.support = new SupportService(this.request);
    }
}

