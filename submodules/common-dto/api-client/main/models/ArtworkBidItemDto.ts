/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkBidItemDto = {
    /**
     * ID of the artwork bid
     */
    id: number;
    /**
     * ID of the artwork
     */
    artwork_id: number;
    /**
     * Title of the artwork bid
     */
    title: string;
    /**
     * Description of the artwork bid
     */
    description: string;
    /**
     * Price of the artwork bid
     */
    price: number;
    /**
     * User who made the bid
     */
    user: UserPreviewDto;
    /**
     * Flag indicating if the bid is the winner
     */
    is_winner: boolean;
    /**
     * Flag indicating if the bid is active
     */
    is_active: boolean;
    /**
     * Date and time when the bid was created
     */
    created_at: string;
};

