/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewDto } from './ArtworkPreviewDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type EventItemDto = {
    /**
     * Id of event
     */
    id: number;
    /**
     * Title of event
     */
    title: string;
    /**
     * Location of event
     */
    location: string | null;
    /**
     * Start date of event
     */
    date_from: string | null;
    /**
     * End date of event
     */
    date_to: string | null;
    /**
     * URL for event
     */
    url: string | null;
    /**
     * Author of event
     */
    author: UserPreviewDto;
    /**
     * Artworks of event
     */
    artworks: Array<ArtworkPreviewDto>;
    /**
     * Date of creation of event
     */
    created_at: string;
};

