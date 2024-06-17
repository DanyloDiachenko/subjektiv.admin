/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPostItemDto } from './ArtworkPostItemDto';
export type MainArtworkPostGetFeedResponseDto = {
    /**
     * Array of items
     */
    items: Array<ArtworkPostItemDto>;
    /**
     * The cursor for the next page
     */
    next_cursor?: string;
};

