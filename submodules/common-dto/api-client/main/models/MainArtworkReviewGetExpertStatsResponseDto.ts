/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainArtworkReviewGetExpertStatsResponseDto = {
    /**
     * Unread count of pending incoming requests
     */
    requests_new: number;
    /**
     * Total count of pending incoming requests
     */
    requests_total: number;
    /**
     * Reviews with closest publish_till_date
     */
    reviews_expires: number;
    /**
     * How many reviews currently in work
     */
    reviews_active: number;
};

