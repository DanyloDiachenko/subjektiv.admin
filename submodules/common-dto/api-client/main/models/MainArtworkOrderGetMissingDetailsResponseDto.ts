/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkMissingDetailsItemDto } from './ArtworkMissingDetailsItemDto';
export type MainArtworkOrderGetMissingDetailsResponseDto = {
    /**
     * Artworks with missed details
     */
    missed_details: Array<ArtworkMissingDetailsItemDto>;
    /**
     * Artworks with filled details
     */
    filled_details: Array<ArtworkMissingDetailsItemDto>;
};

