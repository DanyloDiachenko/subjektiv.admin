/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryOperator } from './DeliveryOperator';
export type MainArtworkOrderPostRequestDto = {
    /**
     * Buyer first name
     */
    first_name?: string | null;
    /**
     * Buyer last name
     */
    last_name?: string | null;
    /**
     * Buyer email
     */
    email?: string | null;
    /**
     * Buyer phone
     */
    phone?: string | null;
    /**
     * Delivery amount. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    delivery_amount?: number;
    /**
     * Taxes amount. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    taxes_amount?: number;
    /**
     * Weight of item
     */
    weight?: number;
    /**
     * VAT
     */
    vat?: number;
    delivery_operator?: DeliveryOperator;
    /**
     * Delivery tracking number. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    delivery_tracking_number?: string | null;
    /**
     * Estimated delivery date. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    estimated_delivery_date?: string | null;
    /**
     * Billing address ID
     */
    billing_address_id?: number;
    /**
     * Artwork ID
     */
    artwork_id: number;
    /**
     * Shipping address ID
     */
    shipping_address_id: number;
};

