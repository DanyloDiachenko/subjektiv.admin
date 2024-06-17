/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainDeliveryCalculateCheckPostResponseDto } from '../models/ApiResponse_MainDeliveryCalculateCheckPostResponseDto';
import type { ApiResponse_MainDeliveryCalculatePostResponseDto } from '../models/ApiResponse_MainDeliveryCalculatePostResponseDto';
import type { ApiResponse_MainDeliveryCalculatePricePostResponseDto } from '../models/ApiResponse_MainDeliveryCalculatePricePostResponseDto';
import type { MainDeliveryCalculateCheckPostRequestDto } from '../models/MainDeliveryCalculateCheckPostRequestDto';
import type { MainDeliveryCalculatePostRequestDto } from '../models/MainDeliveryCalculatePostRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class DeliveryService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get deliveries
     * @returns ApiResponse_MainDeliveryCalculatePostResponseDto Deliveries
     * @throws ApiError
     */
    public deliveryControllerGetAll({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainDeliveryCalculatePostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainDeliveryCalculatePostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/delivery/calculate',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns ApiResponse_MainDeliveryCalculateCheckPostResponseDto
     * @throws ApiError
     */
    public deliveryControllerGetAllCheck({
        requestBody,
    }: {
        requestBody: MainDeliveryCalculateCheckPostRequestDto,
    }): CancelablePromise<ApiResponse_MainDeliveryCalculateCheckPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/delivery/calculate/check',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get deliveries
     * @returns ApiResponse_MainDeliveryCalculatePricePostResponseDto Deliveries
     * @throws ApiError
     */
    public deliveryControllerGetPrice({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainDeliveryCalculatePostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainDeliveryCalculatePricePostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/delivery/calculate-price',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
