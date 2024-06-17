/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkOfferItemDto = {
    /**
     * ID of the artwork offer
     */
    id: number;
    /**
     * ID of the artwork
     */
    artwork_id: number;
    /**
     * Title of the artwork offer
     */
    title: string;
    /**
     * Description of the artwork offer
     */
    description: string;
    /**
     * Price of the artwork offer
     */
    price: number;
    /**
     * User who made the offer
     */
    user: UserPreviewDto;
    /**
     * Flag indicating if the offer is the winner
     */
    is_winner: boolean;
    /**
     * Flag indicating if the offer is active
     */
    is_active: boolean;
    /**
     * Date and time when the offer was created
     */
    created_at: string;
};

