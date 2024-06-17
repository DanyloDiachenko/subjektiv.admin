/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewWithAuthorDto } from './ArtworkPreviewWithAuthorDto';
import type { ArtworkReviewStatus } from './ArtworkReviewStatus';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkReviewItemDto = {
    /**
     * The unique identifier of the review item
     */
    id: number;
    /**
     * The artwork information
     */
    artwork: ArtworkPreviewWithAuthorDto;
    /**
     * The reviewer information
     */
    expert: UserPreviewDto;
    /**
     * The title of the review
     */
    title: string | null;
    /**
     * The description of the review
     */
    description: string | null;
    status: ArtworkReviewStatus;
    /**
     * The date till the review is published
     */
    publish_till_date: string | null;
    /**
     * Flag indicating that the review till date is too close
     */
    is_publish_till_date_expires_soon: boolean;
    /**
     * The date when the review publish till date can be extended
     */
    publish_till_date_extending_available_date: string | null;
    /**
     * The date when the review is published
     */
    publish_date: string | null;
    /**
     * The date till the review can be edited after publication
     */
    edit_till_date: string | null;
    /**
     * The update date of the review
     */
    update_date: string;
    /**
     * The creation date of the review
     */
    created_at: string;
};

