/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainArtworkBidGetArtworkIdResponseDto } from '../models/MainArtworkBidGetArtworkIdResponseDto';
import type { MainArtworkBidGetUsernameResponseDto } from '../models/MainArtworkBidGetUsernameResponseDto';
import type { MainArtworkBidPostRequestDto } from '../models/MainArtworkBidPostRequestDto';
import type { MainArtworkBidPutRequestDto } from '../models/MainArtworkBidPutRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkBidService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a bid request for an artwork
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkBidControllerCreateBidRequest({
        requestBody,
    }: {
        requestBody: MainArtworkBidPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/bid',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of bids for an artwork
     * @returns MainArtworkBidGetArtworkIdResponseDto List of bids for the artwork
     * @throws ApiError
     */
    public artworkBidControllerGetArtworkBids({
        artworkId,
        page,
    }: {
        /**
         * Id of the artwork
         */
        artworkId: number,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainArtworkBidGetArtworkIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/bid/artwork/{artwork_id}',
            path: {
                'artwork_id': artworkId,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Get list of artwork bids by username. To see bids of any user (including inactive): [ACCESS: Required access functions: main.artworkBid:viewInactive]
     * @returns MainArtworkBidGetUsernameResponseDto List of artwork bids
     * @throws ApiError
     */
    public artworkBidControllerGetByUsername({
        username,
        page,
    }: {
        username: string,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainArtworkBidGetUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/bid/username/{username}',
            path: {
                'username': username,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Update artwork bid request
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkBidControllerPutBid({
        bidId,
        requestBody,
    }: {
        bidId: number,
        requestBody: MainArtworkBidPutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/bid/{bid_id}',
            path: {
                'bid_id': bidId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
