/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainKeywordsPostResponseDto } from '../models/ApiResponse_MainKeywordsPostResponseDto';
import type { ApiResponse_MainKeywordsPutIdResponseDto } from '../models/ApiResponse_MainKeywordsPutIdResponseDto';
import type { MainKeywordsGetResponseDto } from '../models/MainKeywordsGetResponseDto';
import type { MainKeywordsMainKeywordsGetIdResponseDto } from '../models/MainKeywordsMainKeywordsGetIdResponseDto';
import type { MainKeywordsPostRequestDto } from '../models/MainKeywordsPostRequestDto';
import type { MainKeywordsPutIdRequestDto } from '../models/MainKeywordsPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class KeywordsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get keywords
     * @returns MainKeywordsGetResponseDto Keywords
     * @throws ApiError
     */
    public keywordControllerGetAll({
        page,
        s,
        contentLanguage,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Search by title.
         */
        s?: string,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainKeywordsGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/keywords',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                's': s,
            },
        });
    }
    /**
     * Create keyword. [ACCESS: Required access functions: main.keyword:create]
     * @returns ApiResponse_MainKeywordsPostResponseDto
     * @throws ApiError
     */
    public keywordControllerCreateKeyword({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainKeywordsPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainKeywordsPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/keywords',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get keyword
     * @returns MainKeywordsMainKeywordsGetIdResponseDto Keyword object
     * @throws ApiError
     */
    public keywordControllerGetKeyword({
        id,
        contentLanguage,
    }: {
        /**
         * Keyword identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainKeywordsMainKeywordsGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/keywords/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update keyword. [ACCESS: Required access functions: main.keyword:update]
     * @returns ApiResponse_MainKeywordsPutIdResponseDto
     * @throws ApiError
     */
    public keywordControllerUpdateKeyword({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Keyword identifier
         */
        id: number,
        requestBody: MainKeywordsPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainKeywordsPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/keywords/{id}',
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
     * Delete keyword. [ACCESS: Required access functions: main.keyword:delete]
     * @returns any
     * @throws ApiError
     */
    public keywordControllerDeleteKeyword({
        id,
    }: {
        /**
         * Keyword identifier
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
            url: '/keywords/{id}',
            path: {
                'id': id,
            },
        });
    }
}
