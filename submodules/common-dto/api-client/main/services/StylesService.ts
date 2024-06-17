/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainStylePostResponseDto } from '../models/ApiResponse_MainStylePostResponseDto';
import type { ApiResponse_MainStylePutIdResponseDto } from '../models/ApiResponse_MainStylePutIdResponseDto';
import type { MainStyleGetIdResponseDto } from '../models/MainStyleGetIdResponseDto';
import type { MainStyleGetResponseDto } from '../models/MainStyleGetResponseDto';
import type { MainStylePostRequestDto } from '../models/MainStylePostRequestDto';
import type { MainStylePutIdRequestDto } from '../models/MainStylePutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class StylesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get styles
     * @returns MainStyleGetResponseDto Styles
     * @throws ApiError
     */
    public styleControllerGetAll({
        page,
        contentLanguage,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainStyleGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/styles',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create style. [ACCESS: Required access functions: main.style:create]
     * @returns ApiResponse_MainStylePostResponseDto
     * @throws ApiError
     */
    public styleControllerCreateStyle({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainStylePostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainStylePostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/styles',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get style
     * @returns MainStyleGetIdResponseDto Style object
     * @throws ApiError
     */
    public styleControllerGetStyle({
        idOrSlug,
        contentLanguage,
    }: {
        /**
         * Style identifier or slug
         */
        idOrSlug: (string | number),
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainStyleGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/styles/{idOrSlug}',
            path: {
                'idOrSlug': idOrSlug,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update style. [ACCESS: Required access functions: main.style:update]
     * @returns ApiResponse_MainStylePutIdResponseDto
     * @throws ApiError
     */
    public styleControllerUpdateStyle({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Style identifier
         */
        id: number,
        requestBody: MainStylePutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainStylePutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/styles/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete style. [ACCESS: Required access functions: main.style:delete]
     * @returns any
     * @throws ApiError
     */
    public styleControllerDeleteStyle({
        id,
    }: {
        /**
         * Style identifier
         */
        id: number,
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
            method: 'DELETE',
            url: '/styles/{id}',
            path: {
                'id': id,
            },
        });
    }
}
