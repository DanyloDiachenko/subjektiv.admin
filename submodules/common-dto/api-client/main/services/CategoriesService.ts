/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainCategoriesPostResponseDto } from '../models/ApiResponse_MainCategoriesPostResponseDto';
import type { ApiResponse_MainCategoriesPutIdResponseDto } from '../models/ApiResponse_MainCategoriesPutIdResponseDto';
import type { MainCategoriesGetIdResponseDto } from '../models/MainCategoriesGetIdResponseDto';
import type { MainCategoriesGetResponseDto } from '../models/MainCategoriesGetResponseDto';
import type { MainCategoriesPostRequestDto } from '../models/MainCategoriesPostRequestDto';
import type { MainCategoriesPutIdRequestDto } from '../models/MainCategoriesPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class CategoriesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get categories
     * @returns MainCategoriesGetResponseDto Categories
     * @throws ApiError
     */
    public categoryControllerGetAll({
        page,
        contentLanguage,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainCategoriesGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/categories',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create category. [ACCESS: Required access functions: main.category:create]
     * @returns ApiResponse_MainCategoriesPostResponseDto
     * @throws ApiError
     */
    public categoryControllerCreateCategory({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainCategoriesPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCategoriesPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/categories',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get category
     * @returns MainCategoriesGetIdResponseDto Category object
     * @throws ApiError
     */
    public categoryControllerGetCategory({
        idOrSlug,
        contentLanguage,
    }: {
        /**
         * Category identifier or slug
         */
        idOrSlug: (string | number),
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainCategoriesGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/categories/{idOrSlug}',
            path: {
                'idOrSlug': idOrSlug,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update category. [ACCESS: Required access functions: main.category:update]
     * @returns ApiResponse_MainCategoriesPutIdResponseDto
     * @throws ApiError
     */
    public categoryControllerUpdateCategory({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Category identifier
         */
        id: number,
        requestBody: MainCategoriesPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainCategoriesPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/categories/{id}',
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
     * Delete category. [ACCESS: Required access functions: main.category:delete]
     * @returns any
     * @throws ApiError
     */
    public categoryControllerDeleteCategory({
        id,
    }: {
        /**
         * Category identifier
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
            url: '/categories/{id}',
            path: {
                'id': id,
            },
        });
    }
}
