/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewDto } from './ArtworkPreviewDto';
import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentOperatorEnum } from './PaymentOperatorEnum';
import type { PayoutReceiverTypeEnum } from './PayoutReceiverTypeEnum';
import type { PayoutStateEnum } from './PayoutStateEnum';
import type { UserPayoutReceiverDto } from './UserPayoutReceiverDto';
export type MainArtworkOrderGetIdPayoutResponseDto = {
    /**
     * The ID of the payment
     */
    id: number;
    /**
     * The description of the payment
     */
    description: string;
    receiver_type: PayoutReceiverTypeEnum;
    source_operator: PaymentOperatorEnum;
    /**
     * The amount of the payment in the source currency
     */
    source_amount: number;
    source_currency_code: CurrencyEnum;
    /**
     * The conversion rate of the payment
     */
    conversion_rate: number;
    target_operator: PaymentOperatorEnum;
    /**
     * The amount of the payment in the target currency
     */
    target_amount: number;
    target_currency_code: CurrencyEnum;
    /**
     * Payment id
     */
    payment_id: number;
    /**
     * receiver_external_id
     */
    receiver_external_id: string;
    /**
     * external_payout_id
     */
    external_payout_id: string | null;
    status: PayoutStateEnum;
    /**
     * last4Digits
     */
    last4Digits: string | null;
    /**
     * The date of the payment update
     */
    update_date: string;
    /**
     * The date of the payment creation
     */
    created_at: string;
    /**
     * The ID of the order
     */
    order_id: number;
    /**
     * Receiver user
     */
    receiver_user: UserPayoutReceiverDto | null;
    /**
     * subjektiv_id
     */
    artwork: ArtworkPreviewDto | null;
};

