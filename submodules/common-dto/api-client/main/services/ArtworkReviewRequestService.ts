/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ArtworkReviewRequestStatus } from '../models/ArtworkReviewRequestStatus';
import type { MainArtworkReviewRequestGetResponseDto } from '../models/MainArtworkReviewRequestGetResponseDto';
import type { MainArtworkReviewRequestPostRequestDto } from '../models/MainArtworkReviewRequestPostRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkReviewRequestService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create review request by expert
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkReviewRequestControllerPost({
        requestBody,
    }: {
        requestBody: MainArtworkReviewRequestPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/review/request',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of artwork review requests.
     * @returns MainArtworkReviewRequestGetResponseDto List of artwork review requests
     * @throws ApiError
     */
    public artworkReviewRequestControllerGet({
        page,
        artworkId,
        expertUsername,
        createdByUsername,
        statuses,
        artistApproveDateFrom,
        artistApproveDateTo,
        expertResponseTillDateFrom,
        expertResponseTillDateTo,
        expertResponseDateFrom,
        expertResponseDateTo,
        createdAtFrom,
        createdAtTo,
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
         * Username of expert
         */
        expertUsername?: string,
        /**
         * Username of created by
         */
        createdByUsername?: string,
        /**
         * Artwork review request statuses. To view unpublished requests, specify expert_username
         */
        statuses?: Array<ArtworkReviewRequestStatus>,
        /**
         * Artist approve date from
         */
        artistApproveDateFrom?: string,
        /**
         * Artist approve date to
         */
        artistApproveDateTo?: string,
        /**
         * Expert response till date from
         */
        expertResponseTillDateFrom?: string,
        /**
         * Expert response till date to
         */
        expertResponseTillDateTo?: string,
        /**
         * Expert response date from
         */
        expertResponseDateFrom?: string,
        /**
         * Expert response date to
         */
        expertResponseDateTo?: string,
        /**
         * Create date from
         */
        createdAtFrom?: string,
        /**
         * Create date to
         */
        createdAtTo?: string,
    }): CancelablePromise<MainArtworkReviewRequestGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/review/request',
            query: {
                'page': page,
                'artwork_id': artworkId,
                'expert_username': expertUsername,
                'created_by_username': createdByUsername,
                'statuses': statuses,
                'artist_approve_date_from': artistApproveDateFrom,
                'artist_approve_date_to': artistApproveDateTo,
                'expert_response_till_date_from': expertResponseTillDateFrom,
                'expert_response_till_date_to': expertResponseTillDateTo,
                'expert_response_date_from': expertResponseDateFrom,
                'expert_response_date_to': expertResponseDateTo,
                'created_at_from': createdAtFrom,
                'created_at_to': createdAtTo,
            },
        });
    }
    /**
     * Withdraw review request by artist or expert
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkReviewRequestControllerDelete({
        id,
    }: {
        /**
         * Id of artwork review request
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/review/request/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Response to request by expert
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkReviewRequestControllerPutExpertResponse({
        response,
        requestId,
    }: {
        /**
         * Response is "reject" | "accept"
         */
        response: string,
        /**
         * Id of review request
         */
        requestId: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/review/request/{response}/{request_id}',
            path: {
                'response': response,
                'request_id': requestId,
            },
        });
    }
}
