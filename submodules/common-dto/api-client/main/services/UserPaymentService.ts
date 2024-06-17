/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainPaymentGetMyPaymentOperatorResponseDto } from '../models/MainPaymentGetMyPaymentOperatorResponseDto';
import type { MainPaymentGetOnboardingLinkResponseDto } from '../models/MainPaymentGetOnboardingLinkResponseDto';
import type { MainPaymentGetPayoutCurrenciesResponseDto } from '../models/MainPaymentGetPayoutCurrenciesResponseDto';
import type { MainPaymentGetUpdateAccountLinkResponseDto } from '../models/MainPaymentGetUpdateAccountLinkResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class UserPaymentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get users payment operator
     * @returns MainPaymentGetMyPaymentOperatorResponseDto
     * @throws ApiError
     */
    public userPaymentControllerGetMyPaymentOperator(): CancelablePromise<MainPaymentGetMyPaymentOperatorResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/payment/my-payment-operator',
        });
    }
    /**
     * Get onboarding link
     * @returns MainPaymentGetOnboardingLinkResponseDto
     * @throws ApiError
     */
    public userPaymentControllerGetOnboardingLink(): CancelablePromise<MainPaymentGetOnboardingLinkResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/payment/onboarding/link',
        });
    }
    /**
     * Update account link
     * @returns MainPaymentGetUpdateAccountLinkResponseDto
     * @throws ApiError
     */
    public userPaymentControllerGetUpdateAccountLink(): CancelablePromise<MainPaymentGetUpdateAccountLinkResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/payment/update-account/link',
        });
    }
    /**
     * Delete payment account
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public userPaymentControllerDeletePaymentAccount(): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user/payment/account',
        });
    }
    /**
     * Get available payout currencies
     * @returns MainPaymentGetPayoutCurrenciesResponseDto
     * @throws ApiError
     */
    public userPaymentControllerGetPayoutCurrencies(): CancelablePromise<MainPaymentGetPayoutCurrenciesResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/payment/payout-currencies',
        });
    }
}
