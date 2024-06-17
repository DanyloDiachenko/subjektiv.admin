/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CognitoEmailDto } from '../models/CognitoEmailDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class CognitoEmailService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Cognito email hook.
     * @returns any Operation complete
     * @throws ApiError
     */
    public cognitoControllerHook({
        xLambdaAuth,
        requestBody,
    }: {
        /**
         * Cognito lambda auth code
         */
        xLambdaAuth: string,
        requestBody: CognitoEmailDto,
    }): CancelablePromise<{
        /**
         * Indicates whether the request was successful
         */
        success?: boolean;
        /**
         * Response data
         */
        data?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/cognito/email/hook',
            headers: {
                'X-Lambda-Auth': xLambdaAuth,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
