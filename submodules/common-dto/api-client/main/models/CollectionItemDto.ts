/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewDto } from './ArtworkPreviewDto';
export type CollectionItemDto = {
    /**
     * Identifier of collection
     */
    id: number;
    /**
     * Title of collection
     */
    title: string;
    /**
     * Count of artworks in collection
     */
    artworks_count: number;
    /**
     * Array of latest added artworks
     */
    latest_added: Array<ArtworkPreviewDto>;
    /**
     * Is collection contains specified in request artwork
     */
    is_contain_passed_artwork?: boolean;
};

