/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentOperatorEnum } from './PaymentOperatorEnum';
export type MainCountriesPutIdRequestDto = {
    /**
     * Localized title of country
     */
    title?: string;
    /**
     * Country code
     */
    short_code?: string;
    payment_operator?: PaymentOperatorEnum | null;
    /**
     * Flag image id
     */
    flag_image_id?: string | null;
    /**
     * VAT rate
     */
    vat_rate?: number;
    /**
     * Tax rate
     */
    tax_rate?: number;
    /**
     * Operational fee
     */
    operational_fee?: number;
    /**
     * Is VAT
     */
    is_vat?: boolean;
    /**
     * Is active
     */
    is_active?: boolean;
};

