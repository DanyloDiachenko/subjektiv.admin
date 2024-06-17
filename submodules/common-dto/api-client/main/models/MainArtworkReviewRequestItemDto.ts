/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewWithAuthorDto } from './ArtworkPreviewWithAuthorDto';
import type { ArtworkReviewRequestStatus } from './ArtworkReviewRequestStatus';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkReviewRequestItemDto = {
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
     * Who created this request
     */
    created_by: UserPreviewDto;
    /**
     * Flag indicating if the request is read
     */
    is_read_by_expert: boolean;
    status: ArtworkReviewRequestStatus;
    /**
     * Date when artist invites expert to write review
     */
    artist_approve_date: string | null;
    /**
     * The date till expert must respond
     */
    expert_response_till_date: string | null;
    /**
     * The date when expert responded to request
     */
    expert_response_date: string | null;
    /**
     * The creation date of the request
     */
    created_at: string;
};

