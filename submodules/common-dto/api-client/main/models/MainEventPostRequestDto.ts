/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainEventPostRequestDto = {
    /**
     * Title of event
     */
    title: string;
    /**
     * Location of event
     */
    location?: string;
    /**
     * Start date of event
     */
    date_from?: string;
    /**
     * End date of event
     */
    date_to?: string;
    /**
     * URL for event
     */
    url?: string | null;
    /**
     * Artwork IDs
     */
    artwork_ids?: Array<number>;
};

