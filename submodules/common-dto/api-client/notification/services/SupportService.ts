/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class SupportService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Send email to support
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public supportControllerSendEmail({
        formData,
        contentLanguage,
    }: {
        formData: {
            files: Array<Blob>;
            topic: string;
            text: string;
        },
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/support/send-email',
            headers: {
                'Content-Language': contentLanguage,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
