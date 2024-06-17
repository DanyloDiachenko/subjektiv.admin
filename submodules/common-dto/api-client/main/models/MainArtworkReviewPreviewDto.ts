/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkReviewStatus } from './ArtworkReviewStatus';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkReviewPreviewDto = {
    /**
     * The unique identifier of the review item
     */
    id: number;
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
     * The creation date of the review
     */
    created_at: string;
    /**
     * The date when the review expected to be published
     */
    publish_till_date: string | null;
    /**
     * The date when the review is published
     */
    publish_date: string | null;
    /**
     * The date till the review can be edited after publication
     */
    edit_till_date: string | null;
};

