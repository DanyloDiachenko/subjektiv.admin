/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressPreviewDto } from './AddressPreviewDto';
import type { ArtworkOrderStatus } from './ArtworkOrderStatus';
import type { ArtworkOrderStatusHistoryDto } from './ArtworkOrderStatusHistoryDto';
import type { ArtworkPreviewForOrderDto } from './ArtworkPreviewForOrderDto';
import type { DeliveryOperator } from './DeliveryOperator';
import type { PackagingType } from './PackagingType';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkOrderGetIdResponseDto = {
    /**
     * The ID of the artwork order
     */
    id: number;
    /**
     * Artwork to buy
     */
    artwork: ArtworkPreviewForOrderDto;
    /**
     * Buyer of artwork
     */
    buyer: UserPreviewDto;
    /**
     * Buyer first name
     */
    first_name: string | null;
    /**
     * Buyer last name
     */
    last_name: string | null;
    /**
     * Buyer email
     */
    email: string | null;
    /**
     * Buyer phone
     */
    phone: string | null;
    /**
     * Seller of artwork
     */
    seller: UserPreviewDto;
    /**
     * Specifies if the order is cuor selling
     */
    is_cuor_selling: boolean;
    /**
     * Expert of artwork
     */
    expert: UserPreviewDto | null;
    /**
     * Total amount to pay
     */
    total_amount: number;
    /**
     * Proposed price of the artwork
     */
    artwork_price: number;
    /**
     * Shipping price
     */
    delivery_amount: number;
    /**
     * Address to
     */
    billing_address: AddressPreviewDto | null;
    /**
     * Vat amount
     */
    vat_amount: number | null;
    /**
     * Vat rate
     */
    vat_rate: number | null;
    /**
     * Taxes amount
     */
    taxes_amount: number | null;
    /**
     * Taxes rate
     */
    taxes_rate: number | null;
    /**
     * Weight of the artwork
     */
    weight: number;
    /**
     * Address from
     */
    address_from: AddressPreviewDto;
    /**
     * Address to
     */
    address_to: AddressPreviewDto;
    /**
     * Is item packed by ..creator of order??
     */
    is_packed_by_me: boolean | null;
    packaging_type: PackagingType | null;
    /**
     * Is artwork mounted. Seen only by owner.
     */
    is_mounted: boolean;
    delivery_operator: DeliveryOperator;
    /**
     * Delivery tracking number. Accessible only for Admins.
     */
    delivery_tracking_number: string | null;
    /**
     * Estimated delivery date
     */
    estimated_delivery_date: string | null;
    status: ArtworkOrderStatus;
    /**
     * Status history of the order
     */
    status_history: Array<ArtworkOrderStatusHistoryDto>;
    /**
     * Date of creation
     */
    created_at: string;
    /**
     * Owners profit
     */
    owner_get_amount: number | null;
    /**
     * Experts profit
     */
    expert_get_amount: number | null;
    /**
     * Experts profit percent
     */
    expert_get_percent: number | null;
    /**
     * Authors profit
     */
    author_get_amount: number | null;
    /**
     * Authors profit percent
     */
    author_get_percent: number | null;
    /**
     * System profit
     */
    system_get_amount: number | null;
    /**
     * System profit percent
     */
    system_get_percent: number | null;
    /**
     * Obfuscated overview of card used for payment
     */
    payment_card: string | null;
};

