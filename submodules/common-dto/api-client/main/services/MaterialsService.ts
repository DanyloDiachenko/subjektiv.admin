/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainMaterialPostResponseDto } from '../models/ApiResponse_MainMaterialPostResponseDto';
import type { ApiResponse_MainMaterialPutIdResponseDto } from '../models/ApiResponse_MainMaterialPutIdResponseDto';
import type { MainMaterialGetIdResponseDto } from '../models/MainMaterialGetIdResponseDto';
import type { MainMaterialGetResponseDto } from '../models/MainMaterialGetResponseDto';
import type { MainMaterialPostRequestDto } from '../models/MainMaterialPostRequestDto';
import type { MainMaterialPutIdRequestDto } from '../models/MainMaterialPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class MaterialsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get materials
     * @returns MainMaterialGetResponseDto Materials
     * @throws ApiError
     */
    public materialControllerGetAll({
        page,
        s,
        contentLanguage,
    }: {
        /**
         * Page number. Pass -1 to get all records.
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
    }): CancelablePromise<MainMaterialGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/materials',
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
     * Create material
     * @returns ApiResponse_MainMaterialPostResponseDto
     * @throws ApiError
     */
    public materialControllerCreateMaterial({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainMaterialPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainMaterialPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/materials',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get material
     * @returns MainMaterialGetIdResponseDto Material object
     * @throws ApiError
     */
    public materialControllerGetMaterial({
        idOrSlug,
        contentLanguage,
    }: {
        /**
         * Material identifier or slug
         */
        idOrSlug: (string | number),
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainMaterialGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/materials/{idOrSlug}',
            path: {
                'idOrSlug': idOrSlug,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update material
     * @returns ApiResponse_MainMaterialPutIdResponseDto
     * @throws ApiError
     */
    public materialControllerUpdateMaterial({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Material identifier
         */
        id: number,
        requestBody: MainMaterialPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainMaterialPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/materials/{id}',
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
     * Delete material. [ACCESS: Required access functions: main.material:delete]
     * @returns any
     * @throws ApiError
     */
    public materialControllerDeleteMaterial({
        id,
    }: {
        /**
         * Material identifier
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
            url: '/materials/{id}',
            path: {
                'id': id,
            },
        });
    }
}
