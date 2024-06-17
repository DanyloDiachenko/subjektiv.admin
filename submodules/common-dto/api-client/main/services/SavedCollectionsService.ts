/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainSavedCollectionPostResponseDto } from '../models/ApiResponse_MainSavedCollectionPostResponseDto';
import type { MainSavedCollectionGetIdResponseDto } from '../models/MainSavedCollectionGetIdResponseDto';
import type { MainSavedCollectionGetItemAllResponseDto } from '../models/MainSavedCollectionGetItemAllResponseDto';
import type { MainSavedCollectionGetPublicUsernameResponseDto } from '../models/MainSavedCollectionGetPublicUsernameResponseDto';
import type { MainSavedCollectionGetUserUsernameResponseDto } from '../models/MainSavedCollectionGetUserUsernameResponseDto';
import type { MainSavedCollectionItemArtworkIdPostRequestDto } from '../models/MainSavedCollectionItemArtworkIdPostRequestDto';
import type { MainSavedCollectionPostRequestDto } from '../models/MainSavedCollectionPostRequestDto';
import type { MainSavedCollectionPutIdRequestDto } from '../models/MainSavedCollectionPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class SavedCollectionsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get Saved Collection.
     * @returns MainSavedCollectionGetIdResponseDto Saved Collection object
     * @throws ApiError
     */
    public savedCollectionControllerGet({
        id,
        page,
    }: {
        /**
         * Saved Collection identifier
         */
        id: number,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainSavedCollectionGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/saved-collections/{id}',
            path: {
                'id': id,
            },
            query: {
                'page': page,
            },
            errors: {
                404: `Saved Collection not found`,
            },
        });
    }
    /**
     * Update collection. If not owner, or if you want update "is_public" field: [ACCESS: Required access functions: main.savedCollection:update]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerUpdate({
        id,
        requestBody,
    }: {
        /**
         * Collection identifier
         */
        id: number,
        requestBody: MainSavedCollectionPutIdRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/saved-collections/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete collection. If not owner: [ACCESS: Required access functions: main.savedCollection:delete]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerDelete({
        id,
    }: {
        /**
         * Collection identifier
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/saved-collections/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Create Collection
     * @returns ApiResponse_MainSavedCollectionPostResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerCreate({
        requestBody,
    }: {
        requestBody: MainSavedCollectionPostRequestDto,
    }): CancelablePromise<ApiResponse_MainSavedCollectionPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/saved-collections',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get Saved Collections for user. If not owner: [ACCESS: Required access functions: main.savedCollection:anyUserAccess]
     * @returns MainSavedCollectionGetUserUsernameResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerGetByUsername({
        username,
        page,
        containsArtworkId,
    }: {
        /**
         * Username
         */
        username: string,
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * Artwork to check if collection contains it
         */
        containsArtworkId?: number,
    }): CancelablePromise<MainSavedCollectionGetUserUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/saved-collections/user/{username}',
            path: {
                'username': username,
            },
            query: {
                'page': page,
                'contains_artwork_id': containsArtworkId,
            },
        });
    }
    /**
     * Get Public Saved Collections.
     * @returns MainSavedCollectionGetPublicUsernameResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerGetPublic({
        username,
        page,
    }: {
        /**
         * Username. Pass '*' to get all public collections
         */
        username: string,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainSavedCollectionGetPublicUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/saved-collections/public/{username}',
            path: {
                'username': username,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Apply item for specified collections. If not owner: [ACCESS: Required access functions: main.savedCollectionItem:apply]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public savedCollectionControllerApplyItem({
        artworkId,
        requestBody,
    }: {
        /**
         * Artwork identifier
         */
        artworkId: number,
        requestBody: MainSavedCollectionItemArtworkIdPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/saved-collections/item/{artwork_id}',
            path: {
                'artwork_id': artworkId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of all added artwork items
     * @returns MainSavedCollectionGetItemAllResponseDto List of artwork items
     * @throws ApiError
     */
    public savedCollectionControllerGetAllArtworkItems(): CancelablePromise<MainSavedCollectionGetItemAllResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/saved-collections/item/all',
        });
    }
}
