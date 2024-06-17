/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainCountriesPostResponseDto } from '../models/ApiResponse_MainCountriesPostResponseDto';
import type { ApiResponse_MainCountriesPutIdResponseDto } from '../models/ApiResponse_MainCountriesPutIdResponseDto';
import type { MainCountriesGetIdResponseDto } from '../models/MainCountriesGetIdResponseDto';
import type { MainCountriesGetResponseDto } from '../models/MainCountriesGetResponseDto';
import type { MainCountriesPostRequestDto } from '../models/MainCountriesPostRequestDto';
import type { MainCountriesPutIdRequestDto } from '../models/MainCountriesPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class CountriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get countries
     * @returns MainCountriesGetResponseDto Countries
     * @throws ApiError
     */
    public countryControllerGetAll({
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
    }): CancelablePromise<MainCountriesGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/countries',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create country. [ACCESS: Required access functions: main.country:create]
     * @returns ApiResponse_MainCountriesPostResponseDto
     * @throws ApiError
     */
    public countryControllerCreateCountry({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainCountriesPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCountriesPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/countries',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get country
     * @returns MainCountriesGetIdResponseDto Country object
     * @throws ApiError
     */
    public countryControllerGetCountry({
        id,
        contentLanguage,
    }: {
        /**
         * Country identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainCountriesGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/countries/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update country. [ACCESS: Required access functions: main.country:update]
     * @returns ApiResponse_MainCountriesPutIdResponseDto
     * @throws ApiError
     */
    public countryControllerUpdateCountry({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Country identifier
         */
        id: number,
        requestBody: MainCountriesPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCountriesPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/countries/{id}',
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
     * Delete country. [ACCESS: Required access functions: main.country:delete]
     * @returns any
     * @throws ApiError
     */
    public countryControllerDeleteCountry({
        id,
    }: {
        /**
         * Country identifier
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
            url: '/countries/{id}',
            path: {
                'id': id,
            },
        });
    }
}
