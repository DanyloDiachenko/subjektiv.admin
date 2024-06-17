/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ArtworkReviewStatus } from '../models/ArtworkReviewStatus';
import type { MainArtworkReviewGetExpertStatsResponseDto } from '../models/MainArtworkReviewGetExpertStatsResponseDto';
import type { MainArtworkReviewGetIdResponseDto } from '../models/MainArtworkReviewGetIdResponseDto';
import type { MainArtworkReviewGetResponseDto } from '../models/MainArtworkReviewGetResponseDto';
import type { MainArtworkReviewPutIdRequestDto } from '../models/MainArtworkReviewPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkReviewService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Extend review till publish date by expert
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkReviewControllerPostExtendPublishTillDate({
        reviewId,
    }: {
        /**
         * Id of artwork review
         */
        reviewId: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/review/extend-publish-till-date/{review_id}',
            path: {
                'review_id': reviewId,
            },
        });
    }
    /**
     * Get info about artwork reviews and requests, for expert
     * @returns MainArtworkReviewGetExpertStatsResponseDto
     * @throws ApiError
     */
    public artworkReviewControllerGetExpertStats(): CancelablePromise<MainArtworkReviewGetExpertStatsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/review/expert/stats',
        });
    }
    /**
     * Get list of artwork reviews. To view unpublished reviews: [ACCESS: Required access functions: main.artworkReview:viewUnpublished]
     * @returns MainArtworkReviewGetResponseDto List of artwork reviews
     * @throws ApiError
     */
    public artworkReviewControllerGet({
        page,
        artworkId,
        expertUsername,
        statuses,
        publishTillDateFrom,
        publishTillDateTo,
        isPublishTillDateExpiresSoon,
        publishDateFrom,
        publishDateTo,
        createDateFrom,
        createDateTo,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * The ID of the artwork
         */
        artworkId?: number,
        /**
         * The username of the expert
         */
        expertUsername?: string,
        /**
         * Artwork review statuses. To view unpublished reviews, specify expert_username
         */
        statuses?: Array<ArtworkReviewStatus>,
        /**
         * Publish till date from
         */
        publishTillDateFrom?: string,
        /**
         * Publish till date to
         */
        publishTillDateTo?: string,
        /**
         * Is review publish till date expires soon?
         */
        isPublishTillDateExpiresSoon?: boolean,
        /**
         * Publish date from
         */
        publishDateFrom?: string,
        /**
         * Publish date to
         */
        publishDateTo?: string,
        /**
         * Create date from
         */
        createDateFrom?: string,
        /**
         * Create date to
         */
        createDateTo?: string,
    }): CancelablePromise<MainArtworkReviewGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/review',
            query: {
                'page': page,
                'artwork_id': artworkId,
                'expert_username': expertUsername,
                'statuses': statuses,
                'publish_till_date_from': publishTillDateFrom,
                'publish_till_date_to': publishTillDateTo,
                'is_publish_till_date_expires_soon': isPublishTillDateExpiresSoon,
                'publish_date_from': publishDateFrom,
                'publish_date_to': publishDateTo,
                'create_date_from': createDateFrom,
                'create_date_to': createDateTo,
            },
        });
    }
    /**
     *
     * Update artwork review.
     * Reviewer can update only his inProgress reviews.
     * To edit at any time any review: [ACCESS: Required access functions: main.artworkReview:update]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkReviewControllerPutId({
        id,
        requestBody,
    }: {
        /**
         * Id of artwork review to update by expert
         */
        id: number,
        requestBody: MainArtworkReviewPutIdRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/review/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     *
     * Get artwork review by id.
     * Unpublished review can be viewed only by his reviewer or by access function: [ACCESS: Required access functions: main.artworkReview:viewUnpublished]
     * @returns MainArtworkReviewGetIdResponseDto Artwork review
     * @throws ApiError
     */
    public artworkReviewControllerGetArtworkReviewById({
        id,
    }: {
        /**
         * Id of the artwork review
         */
        id: number,
    }): CancelablePromise<MainArtworkReviewGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/review/{id}',
            path: {
                'id': id,
            },
        });
    }
}
