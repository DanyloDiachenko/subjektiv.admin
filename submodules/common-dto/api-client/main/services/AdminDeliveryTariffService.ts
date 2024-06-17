/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { DeliveryOperator } from '../models/DeliveryOperator';
import type { MainDeliveryTariffGetIdResponseDto } from '../models/MainDeliveryTariffGetIdResponseDto';
import type { MainDeliveryTariffGetResponseDto } from '../models/MainDeliveryTariffGetResponseDto';
import type { MainDeliveryTariffPostRequestDto } from '../models/MainDeliveryTariffPostRequestDto';
import type { MainDeliveryTariffPutIdRequestDto } from '../models/MainDeliveryTariffPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AdminDeliveryTariffService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create delivery tariff. [ACCESS: Required access functions: main.adminDeliveryTariff:create]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminDeliveryTariffControllerPost({
        requestBody,
    }: {
        requestBody: MainDeliveryTariffPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/delivery-tariff',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of delivery tariffs. [ACCESS: Required access functions: main.adminDeliveryTariff:view]
     * @returns MainDeliveryTariffGetResponseDto List of delivery tariffs
     * @throws ApiError
     */
    public adminDeliveryTariffControllerGetList({
        page,
        operator,
        countryFromId,
        countryToId,
        contentLanguage,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Delivery operator
         */
        operator?: DeliveryOperator,
        /**
         * Country from id
         */
        countryFromId?: number,
        /**
         * Country to id
         */
        countryToId?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainDeliveryTariffGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/delivery-tariff',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                'operator': operator,
                'country_from_id': countryFromId,
                'country_to_id': countryToId,
            },
        });
    }
    /**
     * Update delivery tariff. [ACCESS: Required access functions: main.adminDeliveryTariff:update]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminDeliveryTariffControllerUpdate({
        id,
        requestBody,
    }: {
        /**
         * Delivery tariff identifier
         */
        id: number,
        requestBody: MainDeliveryTariffPutIdRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/delivery-tariff/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete delivery tariff. [ACCESS: Required access functions: main.adminDeliveryTariff:delete]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminDeliveryTariffControllerDelete({
        id,
    }: {
        /**
         * Id of the delivery tariff to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/admin/delivery-tariff/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get delivery tariff by ID. [ACCESS: Required access functions: main.address:view]
     * @returns MainDeliveryTariffGetIdResponseDto Main delivery tariff information
     * @throws ApiError
     */
    public adminDeliveryTariffControllerGetId({
        id,
        contentLanguage,
    }: {
        /**
         * ID of the delivery tariff to get
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainDeliveryTariffGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/delivery-tariff/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
}
