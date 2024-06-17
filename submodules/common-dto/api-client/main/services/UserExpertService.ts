/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainUserExpertGetResponseDto } from '../models/MainUserExpertGetResponseDto';
import type { MainUserExpertPostApplyForReviewRequestDto } from '../models/MainUserExpertPostApplyForReviewRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class UserExpertService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of experts
     * @returns MainUserExpertGetResponseDto
     * @throws ApiError
     */
    public userExpertControllerGet({
        page,
        artworkId,
        s,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Artwork identifier
         */
        artworkId?: number,
        /**
         * Search by string.
         */
        s?: string,
    }): CancelablePromise<MainUserExpertGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/expert',
            query: {
                'page': page,
                'artwork_id': artworkId,
                's': s,
            },
        });
    }
    /**
     * Apply expert for an artwork review by artist
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public userExpertControllerPostApplyForArtworkReview({
        requestBody,
    }: {
        requestBody: MainUserExpertPostApplyForReviewRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/expert/apply-for-artwork-review',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
