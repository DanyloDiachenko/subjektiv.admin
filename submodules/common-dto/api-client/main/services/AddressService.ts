/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainAddressPostResponseDto } from '../models/ApiResponse_MainAddressPostResponseDto';
import type { MainAddressGetIdResponseDto } from '../models/MainAddressGetIdResponseDto';
import type { MainAddressGetResponseDto } from '../models/MainAddressGetResponseDto';
import type { MainAddressPostRequestDto } from '../models/MainAddressPostRequestDto';
import type { MainAddressPutIdRequestDto } from '../models/MainAddressPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AddressService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create address for a user. If this user isn't you: [ACCESS: Required access functions: main.address:create]
     * @returns ApiResponse_MainAddressPostResponseDto Operation was successful
     * @throws ApiError
     */
    public addressControllerCreateAddress({
        requestBody,
    }: {
        requestBody: MainAddressPostRequestDto,
    }): CancelablePromise<ApiResponse_MainAddressPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/address',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of addresses. If this user isn't you: [ACCESS: Required access functions: main.address:view]
     * @returns MainAddressGetResponseDto List of addresses
     * @throws ApiError
     */
    public addressControllerGetAddresses({
        page,
        username,
        contentLanguage,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * Username of address owner
         */
        username?: string,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainAddressGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/address',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                'username': username,
            },
        });
    }
    /**
     * Update main address. If this user isn't you: [ACCESS: Required access functions: main.address:update]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public addressControllerUpdateAddress({
        id,
        requestBody,
    }: {
        /**
         * Id of the address to update
         */
        id: number,
        requestBody: MainAddressPutIdRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/address/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete address. If this user isn't you: [ACCESS: Required access functions: main.address:delete]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public addressControllerDeleteAddress({
        id,
    }: {
        /**
         * Id of the address to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/address/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get address by ID. If this user isn't you: [ACCESS: Required access functions: main.address:view]
     * @returns MainAddressGetIdResponseDto Main address information
     * @throws ApiError
     */
    public addressControllerGetAddressById({
        id,
        contentLanguage,
    }: {
        /**
         * ID of the address to get
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainAddressGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/address/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
}
