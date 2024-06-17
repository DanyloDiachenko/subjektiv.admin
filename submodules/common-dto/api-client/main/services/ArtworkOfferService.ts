/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainArtworkOfferGetArtworkIdResponseDto } from '../models/MainArtworkOfferGetArtworkIdResponseDto';
import type { MainArtworkOfferGetUsernameResponseDto } from '../models/MainArtworkOfferGetUsernameResponseDto';
import type { MainArtworkOfferPostRequestDto } from '../models/MainArtworkOfferPostRequestDto';
import type { MainArtworkOfferPutRequestDto } from '../models/MainArtworkOfferPutRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkOfferService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create a offer request for an artwork
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkOfferControllerCreateOfferRequest({
        requestBody,
    }: {
        requestBody: MainArtworkOfferPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/offer',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of offers for an artwork. Only artwork owners can see offers for them.
     * @returns MainArtworkOfferGetArtworkIdResponseDto List of offers for the artwork
     * @throws ApiError
     */
    public artworkOfferControllerGetArtworkOffers({
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
    }): CancelablePromise<MainArtworkOfferGetArtworkIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/offer/artwork/{artwork_id}',
            path: {
                'artwork_id': artworkId,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Get list of artwork offers by username. To see offers of any user (including inactive): [ACCESS: Required access functions: main.artworkOffer:viewInactive]
     * @returns MainArtworkOfferGetUsernameResponseDto List of artwork offers
     * @throws ApiError
     */
    public artworkOfferControllerGetByUsername({
        username,
        page,
    }: {
        username: string,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainArtworkOfferGetUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/offer/username/{username}',
            path: {
                'username': username,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Update artwork offer request
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkOfferControllerPutOffer({
        offerId,
        requestBody,
    }: {
        offerId: number,
        requestBody: MainArtworkOfferPutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/offer/{offer_id}',
            path: {
                'offer_id': offerId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
