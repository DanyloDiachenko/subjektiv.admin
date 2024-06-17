/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewDto } from './ArtworkPreviewDto';
import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentOperatorEnum } from './PaymentOperatorEnum';
import type { PaymentStateEnum } from './PaymentStateEnum';
export type ArtworkOrderPaymentItemDto = {
    /**
     * The ID of the payment
     */
    id: number;
    /**
     * The description of the payment
     */
    description: string;
    operator: PaymentOperatorEnum;
    /**
     * subjektiv_id
     */
    artwork: ArtworkPreviewDto | null;
    /**
     * The ID of the payment in the external system
     */
    payment_external_id: string;
    /**
     * The amount of the payment in the source currency
     */
    source_amount: number;
    source_currency_code: CurrencyEnum;
    /**
     * The conversion rate of the payment
     */
    conversion_rate: number | null;
    /**
     * The amount of the payment in the target currency
     */
    target_amount: number | null;
    target_currency_code: CurrencyEnum | null;
    status: PaymentStateEnum;
    /**
     * The reason of the payment cancellation
     */
    cancellation_reason: string | null;
    /**
     * The date of the payment update
     */
    update_date: string;
    /**
     * The date of the payment creation
     */
    created_at: string;
};

