/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainArtworkPassportPostResponseDto } from '../models/ApiResponse_MainArtworkPassportPostResponseDto';
import type { ApiResponse_MainArtworkPostResponseDto } from '../models/ApiResponse_MainArtworkPostResponseDto';
import type { ArtworkOrientationEnum } from '../models/ArtworkOrientationEnum';
import type { ArtWorkStatus } from '../models/ArtWorkStatus';
import type { MainArtworkGetFiltersResponseDto } from '../models/MainArtworkGetFiltersResponseDto';
import type { MainArtworkGetIdResponseDto } from '../models/MainArtworkGetIdResponseDto';
import type { MainArtworkGetResponseDto } from '../models/MainArtworkGetResponseDto';
import type { MainArtworkOrderGetMissingDetailsResponseDto } from '../models/MainArtworkOrderGetMissingDetailsResponseDto';
import type { MainArtworkPassportPostRequestDto } from '../models/MainArtworkPassportPostRequestDto';
import type { MainArtworkPostRequestDto } from '../models/MainArtworkPostRequestDto';
import type { MainArtworkPutRequestDto } from '../models/MainArtworkPutRequestDto';
import type { SortOrder } from '../models/SortOrder';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get artwork. If not published: [ACCESS: Required access functions: main.artwork:viewAll]
     * @returns MainArtworkGetIdResponseDto Artwork
     * @throws ApiError
     */
    public artworkControllerGetArtwork({
        id,
        contentLanguage,
    }: {
        /**
         * Artwork identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update artwork. If not owner: [ACCESS: Required access functions: main.artwork:update]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkControllerUpdateArtwork({
        id,
        requestBody,
    }: {
        /**
         * Artwork identifier
         */
        id: number,
        requestBody: MainArtworkPutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete artwork
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkControllerDeleteArtwork({
        id,
    }: {
        /**
         * Id of the artwork to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get artworks
     * @returns MainArtworkGetResponseDto Artworks
     * @throws ApiError
     */
    public artworkControllerGetArtworks({
        page,
        sortField,
        sortOrder,
        search,
        statuses,
        artistUserName,
        artistUserNameNot,
        ownerUserName,
        ownerUserNameNot,
        cuorOwnerUserName,
        cuorOwnerUserNameNot,
        artistOrOwnerUsername,
        categoryIds,
        categorySlugs,
        materialIds,
        materialSlugs,
        styleIds,
        styleSlugs,
        subjectIds,
        subjectSlugs,
        priceMin,
        priceMax,
        widthMin,
        widthMax,
        heightMin,
        heightMax,
        orientation,
        createDateFrom,
        createDateTo,
        isPublished,
        artworkIds,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Field to sort which
         */
        sortField?: string,
        /**
         * Sort order
         */
        sortOrder?: SortOrder,
        /**
         * Search by title, key words and description.
         */
        search?: string,
        /**
         * Artwork statuses
         */
        statuses?: Array<ArtWorkStatus>,
        /**
         * Username of artist
         */
        artistUserName?: string,
        /**
         * Username of artist is NOT
         */
        artistUserNameNot?: string,
        /**
         * Username of owner
         */
        ownerUserName?: string,
        /**
         * Username of owner is NOT
         */
        ownerUserNameNot?: string,
        /**
         * Username of cuor owner
         */
        cuorOwnerUserName?: string,
        /**
         * Username of cuor owner is NOT
         */
        cuorOwnerUserNameNot?: string,
        /**
         * Username of artist or owner
         */
        artistOrOwnerUsername?: string,
        /**
         * Category IDs
         */
        categoryIds?: Array<number>,
        /**
         * Category slugs
         */
        categorySlugs?: Array<string>,
        /**
         * Material IDs
         */
        materialIds?: Array<number>,
        /**
         * Material slugs
         */
        materialSlugs?: Array<string>,
        /**
         * Style IDs
         */
        styleIds?: Array<number>,
        /**
         * Style slugs
         */
        styleSlugs?: Array<string>,
        /**
         * Subject IDs
         */
        subjectIds?: Array<number>,
        /**
         * Subject slugs
         */
        subjectSlugs?: Array<string>,
        /**
         * Min price
         */
        priceMin?: number,
        /**
         * Max price
         */
        priceMax?: number,
        /**
         * Min width
         */
        widthMin?: number,
        /**
         * Max width
         */
        widthMax?: number,
        /**
         * Min height
         */
        heightMin?: number,
        /**
         * Max height
         */
        heightMax?: number,
        /**
         * Orientations of artwork
         */
        orientation?: Array<ArtworkOrientationEnum>,
        /**
         * Create date from
         */
        createDateFrom?: string,
        /**
         * Create date to
         */
        createDateTo?: string,
        /**
         * Specifies if the artwork is published. Unpublished artworks are visible only for author/owner or admin
         */
        isPublished?: Array<boolean>,
        /**
         * Artwork IDs
         */
        artworkIds?: Array<number>,
    }): CancelablePromise<MainArtworkGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork',
            query: {
                'page': page,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'search': search,
                'statuses': statuses,
                'artist_user_name': artistUserName,
                'artist_user_name_not': artistUserNameNot,
                'owner_user_name': ownerUserName,
                'owner_user_name_not': ownerUserNameNot,
                'cuor_owner_user_name': cuorOwnerUserName,
                'cuor_owner_user_name_not': cuorOwnerUserNameNot,
                'artist_or_owner_username': artistOrOwnerUsername,
                'category_ids': categoryIds,
                'category_slugs': categorySlugs,
                'material_ids': materialIds,
                'material_slugs': materialSlugs,
                'style_ids': styleIds,
                'style_slugs': styleSlugs,
                'subject_ids': subjectIds,
                'subject_slugs': subjectSlugs,
                'price_min': priceMin,
                'price_max': priceMax,
                'width_min': widthMin,
                'width_max': widthMax,
                'height_min': heightMin,
                'height_max': heightMax,
                'orientation': orientation,
                'create_date_from': createDateFrom,
                'create_date_to': createDateTo,
                'is_published': isPublished,
                'artwork_ids': artworkIds,
            },
        });
    }
    /**
     * Create artwork. Only verified users can create artworks.
     * @returns ApiResponse_MainArtworkPostResponseDto Create artwork
     * @throws ApiError
     */
    public artworkControllerCreateArtwork({
        requestBody,
    }: {
        requestBody: MainArtworkPostRequestDto,
    }): CancelablePromise<ApiResponse_MainArtworkPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get artworks search filters
     * @returns MainArtworkGetFiltersResponseDto Search filters of Artworks
     * @throws ApiError
     */
    public artworkControllerGetFilters({
        contentLanguage,
    }: {
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkGetFiltersResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/filters',
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Artworks with missing details
     * @returns MainArtworkOrderGetMissingDetailsResponseDto Artworks
     * @throws ApiError
     */
    public artworkControllerMissingDetailsArtworks({
        contentLanguage,
    }: {
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkOrderGetMissingDetailsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/missing-details',
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Generate passport. Conditionally: [ACCESS: Required access functions: main.artwork:viewAll]
     * @returns ApiResponse_MainArtworkPassportPostResponseDto
     * @throws ApiError
     */
    public artworkControllerPostIdPassport({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Id of the artwork
         */
        id: number,
        requestBody: MainArtworkPassportPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkPassportPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/{id}/passport',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
