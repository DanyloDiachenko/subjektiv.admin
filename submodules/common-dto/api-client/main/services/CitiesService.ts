/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainCitiesPostResponseDto } from '../models/ApiResponse_MainCitiesPostResponseDto';
import type { ApiResponse_MainCitiesPutIdResponseDto } from '../models/ApiResponse_MainCitiesPutIdResponseDto';
import type { MainCitiesGetIdResponseDto } from '../models/MainCitiesGetIdResponseDto';
import type { MainCitiesGetResponseDto } from '../models/MainCitiesGetResponseDto';
import type { MainCitiesPostRequestDto } from '../models/MainCitiesPostRequestDto';
import type { MainCitiesPutIdRequestDto } from '../models/MainCitiesPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class CitiesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get cities
     * @returns MainCitiesGetResponseDto Cities
     * @throws ApiError
     */
    public cityControllerGetAll({
        page,
        contentLanguage,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainCitiesGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/cities',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create city. [ACCESS: Required access functions: main.city:create]
     * @returns ApiResponse_MainCitiesPostResponseDto
     * @throws ApiError
     */
    public cityControllerCreateCity({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainCitiesPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCitiesPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/cities',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get city
     * @returns MainCitiesGetIdResponseDto City object
     * @throws ApiError
     */
    public cityControllerGetCity({
        id,
        contentLanguage,
    }: {
        /**
         * City identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainCitiesGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/cities/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update city. [ACCESS: Required access functions: main.city:update]
     * @returns ApiResponse_MainCitiesPutIdResponseDto
     * @throws ApiError
     */
    public cityControllerUpdateCity({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * City identifier
         */
        id: number,
        requestBody: MainCitiesPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCitiesPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/cities/{id}',
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
     * Delete city. [ACCESS: Required access functions: main.city:delete]
     * @returns any
     * @throws ApiError
     */
    public cityControllerDeleteCity({
        id,
    }: {
        /**
         * City identifier
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
            url: '/cities/{id}',
            path: {
                'id': id,
            },
        });
    }
}
