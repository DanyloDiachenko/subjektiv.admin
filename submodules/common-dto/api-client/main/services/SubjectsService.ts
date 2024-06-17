/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainSubjectPostResponseDto } from '../models/ApiResponse_MainSubjectPostResponseDto';
import type { ApiResponse_MainSubjectPutIdResponseDto } from '../models/ApiResponse_MainSubjectPutIdResponseDto';
import type { MainSubjectGetIdResponseDto } from '../models/MainSubjectGetIdResponseDto';
import type { MainSubjectGetResponseDto } from '../models/MainSubjectGetResponseDto';
import type { MainSubjectPostRequestDto } from '../models/MainSubjectPostRequestDto';
import type { MainSubjectPutIdRequestDto } from '../models/MainSubjectPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class SubjectsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get subjects
     * @returns MainSubjectGetResponseDto Subjects
     * @throws ApiError
     */
    public subjectControllerGetAll({
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
    }): CancelablePromise<MainSubjectGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/subjects',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create subject. [ACCESS: Required access functions: main.subject:create]
     * @returns ApiResponse_MainSubjectPostResponseDto
     * @throws ApiError
     */
    public subjectControllerCreateSubject({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainSubjectPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainSubjectPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/subjects',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get subject
     * @returns MainSubjectGetIdResponseDto Subject object
     * @throws ApiError
     */
    public subjectControllerGetSubject({
        idOrSlug,
        contentLanguage,
    }: {
        /**
         * Subject identifier or slug
         */
        idOrSlug: (string | number),
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainSubjectGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/subjects/{idOrSlug}',
            path: {
                'idOrSlug': idOrSlug,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update subject. [ACCESS: Required access functions: main.subject:update]
     * @returns ApiResponse_MainSubjectPutIdResponseDto
     * @throws ApiError
     */
    public subjectControllerUpdateSubject({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Subject identifier
         */
        id: number,
        requestBody: MainSubjectPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainSubjectPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/subjects/{id}',
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
     * Delete subject. [ACCESS: Required access functions: main.subject:delete]
     * @returns any
     * @throws ApiError
     */
    public subjectControllerDeleteSubject({
        id,
    }: {
        /**
         * Subject identifier
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
            url: '/subjects/{id}',
            path: {
                'id': id,
            },
        });
    }
}
