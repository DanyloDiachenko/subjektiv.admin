/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainArtworkOrderPostUpdatePayoutResponseDto } from '../models/ApiResponse_MainArtworkOrderPostUpdatePayoutResponseDto';
import type { ApiResponse_MainArtworkOrderResponseDto } from '../models/ApiResponse_MainArtworkOrderResponseDto';
import type { ArtworkOrderSortingFields } from '../models/ArtworkOrderSortingFields';
import type { ArtworkOrderStatus } from '../models/ArtworkOrderStatus';
import type { MainArtworkOrderGetCalculateCommissionsResponseDto } from '../models/MainArtworkOrderGetCalculateCommissionsResponseDto';
import type { MainArtworkOrderGetCalculateTaxResponseDto } from '../models/MainArtworkOrderGetCalculateTaxResponseDto';
import type { MainArtworkOrderGetCalculateVatResponseDto } from '../models/MainArtworkOrderGetCalculateVatResponseDto';
import type { MainArtworkOrderGetCalculateWeightResponseDto } from '../models/MainArtworkOrderGetCalculateWeightResponseDto';
import type { MainArtworkOrderGetClientSecretResponseDto } from '../models/MainArtworkOrderGetClientSecretResponseDto';
import type { MainArtworkOrderGetIdPayoutResponseDto } from '../models/MainArtworkOrderGetIdPayoutResponseDto';
import type { MainArtworkOrderGetIdResponseDto } from '../models/MainArtworkOrderGetIdResponseDto';
import type { MainArtworkOrderGetPaymentsResponseDto } from '../models/MainArtworkOrderGetPaymentsResponseDto';
import type { MainArtworkOrderGetPayoutsResponseDto } from '../models/MainArtworkOrderGetPayoutsResponseDto';
import type { MainArtworkOrderGetResponseDto } from '../models/MainArtworkOrderGetResponseDto';
import type { MainArtworkOrderPostRequestDto } from '../models/MainArtworkOrderPostRequestDto';
import type { MainArtworkOrderPutRequestDto } from '../models/MainArtworkOrderPutRequestDto';
import type { PaymentOperatorEnum } from '../models/PaymentOperatorEnum';
import type { PaymentStateEnum } from '../models/PaymentStateEnum';
import type { PayoutReceiverTypeEnum } from '../models/PayoutReceiverTypeEnum';
import type { PayoutStateEnum } from '../models/PayoutStateEnum';
import type { SortOrder } from '../models/SortOrder';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkOrderService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create order for an artwork
     * @returns ApiResponse_MainArtworkOrderResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkOrderControllerCreateOrderRequest({
        requestBody,
    }: {
        requestBody: MainArtworkOrderPostRequestDto,
    }): CancelablePromise<ApiResponse_MainArtworkOrderResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of artwork orders. To view any users orders: [ACCESS: Required access functions: main.artworkOrder:view]
     * @returns MainArtworkOrderGetResponseDto List of artwork orders
     * @throws ApiError
     */
    public artworkOrderControllerGetArtworkOrders({
        page,
        search,
        sortField,
        sortOrder,
        buyerUsername,
        sellerUsername,
        statuses,
        artworkId,
        paymentOperators,
        contentLanguage,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Search by buyer/seller first/last name, OR by artwork title, OR by order ID
         */
        search?: string,
        /**
         * Field to sort which
         */
        sortField?: ArtworkOrderSortingFields,
        /**
         * Sort order
         */
        sortOrder?: SortOrder,
        /**
         * The username of the buyer
         */
        buyerUsername?: string,
        /**
         * The username of the seller
         */
        sellerUsername?: string,
        /**
         * Order statuses
         */
        statuses?: Array<ArtworkOrderStatus>,
        /**
         * The ID of the artwork
         */
        artworkId?: number,
        /**
         * Payment operator
         */
        paymentOperators?: Array<PaymentOperatorEnum>,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkOrderGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                'search': search,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'buyer_username': buyerUsername,
                'seller_username': sellerUsername,
                'statuses': statuses,
                'artwork_id': artworkId,
                'payment_operators': paymentOperators,
            },
        });
    }
    /**
     * How many buyer pay for taxes
     * @returns MainArtworkOrderGetCalculateTaxResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerCalculateTax({
        artworkId,
        countryId,
    }: {
        /**
         * The ID of the artwork
         */
        artworkId: number,
        /**
         * The ID of the country
         */
        countryId: number,
    }): CancelablePromise<MainArtworkOrderGetCalculateTaxResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/calculate-tax',
            query: {
                'artwork_id': artworkId,
                'country_id': countryId,
            },
        });
    }
    /**
     * How many seller pay for taxes
     * @returns MainArtworkOrderGetCalculateVatResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerCalculateVat({
        artworkId,
    }: {
        /**
         * The ID of the artwork
         */
        artworkId: number,
    }): CancelablePromise<MainArtworkOrderGetCalculateVatResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/calculate-vat',
            query: {
                'artwork_id': artworkId,
            },
        });
    }
    /**
     * Get commission calculations for seller
     * @returns MainArtworkOrderGetCalculateCommissionsResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerCalculateCommissions({
        artworkId,
        price,
    }: {
        /**
         * The ID of the artwork
         */
        artworkId: number,
        /**
         * Desired price
         */
        price: number,
    }): CancelablePromise<MainArtworkOrderGetCalculateCommissionsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/calculate-commissions',
            query: {
                'artwork_id': artworkId,
                'price': price,
            },
        });
    }
    /**
     * Calculate weight
     * @returns MainArtworkOrderGetCalculateWeightResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerCalculateWeight({
        width,
        height,
        depth,
    }: {
        /**
         * Width
         */
        width: number,
        /**
         * Height
         */
        height: number,
        /**
         * Depth
         */
        depth: number,
    }): CancelablePromise<MainArtworkOrderGetCalculateWeightResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/calculate-weight',
            query: {
                'width': width,
                'height': height,
                'depth': depth,
            },
        });
    }
    /**
     * Get specific artwork order. To view any users orders: [ACCESS: Required access functions: main.artworkOrder:view]
     * @returns MainArtworkOrderGetIdResponseDto Artwork order
     * @throws ApiError
     */
    public artworkOrderControllerGetById({
        id,
        contentLanguage,
    }: {
        /**
         * Id of the artwork order to get
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkOrderGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update artwork order. Conditionally: [ACCESS: Required access functions: main.artworkOrder:update]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkOrderControllerPutId({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Id of the artwork order to update
         */
        id: number,
        requestBody: MainArtworkOrderPutRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/order/{id}',
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
     * Get payment client secret. Conditionally: [ACCESS: Required access functions: main.artworkOrder:update]
     * @returns MainArtworkOrderGetClientSecretResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerGetClientSecret({
        id,
        contentLanguage,
    }: {
        /**
         * Id of the artwork order
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkOrderGetClientSecretResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/{id}/client-secret',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Get payments. [ACCESS: Required access functions: main.artworkOrder:payments]
     * @returns MainArtworkOrderGetPaymentsResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerGetPayments({
        page,
        operators,
        statuses,
        orderId,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Operator
         */
        operators?: Array<PaymentOperatorEnum>,
        /**
         * Payment state
         */
        statuses?: Array<PaymentStateEnum>,
        /**
         * The ID of the artwork order
         */
        orderId?: number,
    }): CancelablePromise<MainArtworkOrderGetPaymentsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/payments',
            query: {
                'page': page,
                'operators': operators,
                'statuses': statuses,
                'order_id': orderId,
            },
        });
    }
    /**
     * Get payouts. [ACCESS: Required access functions: main.artworkOrder:payments]
     * @returns MainArtworkOrderGetPayoutsResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerGetPayouts({
        page,
        search,
        sourceOperators,
        targetOperators,
        statuses,
        receiverTypes,
        orderId,
        receiverUserIds,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Search by users first/last name
         */
        search?: string,
        /**
         * Operator
         */
        sourceOperators?: Array<PaymentOperatorEnum>,
        /**
         * Operator
         */
        targetOperators?: Array<PaymentOperatorEnum>,
        /**
         * Status
         */
        statuses?: Array<PayoutStateEnum>,
        /**
         * Receiver type
         */
        receiverTypes?: Array<PayoutReceiverTypeEnum>,
        /**
         * The ID of the artwork order
         */
        orderId?: number,
        /**
         * Receiver user IDs
         */
        receiverUserIds?: Array<string>,
    }): CancelablePromise<MainArtworkOrderGetPayoutsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/payouts',
            query: {
                'page': page,
                'search': search,
                'source_operators': sourceOperators,
                'target_operators': targetOperators,
                'statuses': statuses,
                'receiver_types': receiverTypes,
                'order_id': orderId,
                'receiver_user_ids': receiverUserIds,
            },
        });
    }
    /**
     * Get payout. [ACCESS: Required access functions: main.artworkOrder:payments]
     * @returns MainArtworkOrderGetIdPayoutResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerGetPayout({
        id,
    }: {
        /**
         * Payout id
         */
        id: number,
    }): CancelablePromise<MainArtworkOrderGetIdPayoutResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/order/payouts/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update payout. [ACCESS: Required access functions: main.artworkOrder:payments]
     * @returns ApiResponse_MainArtworkOrderPostUpdatePayoutResponseDto
     * @throws ApiError
     */
    public artworkOrderControllerUpdatePayout({
        id,
        status,
    }: {
        /**
         * The ID of the payout
         */
        id: number,
        /**
         * Status of payout
         */
        status: PayoutStateEnum,
    }): CancelablePromise<ApiResponse_MainArtworkOrderPostUpdatePayoutResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/order/update-payout',
            query: {
                'id': id,
                'status': status,
            },
        });
    }
}
