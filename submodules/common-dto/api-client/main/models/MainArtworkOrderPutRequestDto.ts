/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkOrderStatus } from './ArtworkOrderStatus';
import type { DeliveryOperator } from './DeliveryOperator';
import type { PackagingType } from './PackagingType';
export type MainArtworkOrderPutRequestDto = {
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
    /**
     * Is item packed by ..creator of order??
     */
    is_packed_by_me?: boolean | null;
    packaging_type?: PackagingType | null;
    /**
     * Is item mounted
     */
    is_mounted?: boolean;
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
    status?: ArtworkOrderStatus;
    /**
     * Address from. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    address_from_id?: number;
    /**
     * Address to. [ACCESS: Required access functions: main.artworkOrder:update]
     */
    address_to_id?: number;
};

