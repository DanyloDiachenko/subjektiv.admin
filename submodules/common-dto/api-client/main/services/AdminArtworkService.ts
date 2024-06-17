/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ArtworkOrientationEnum } from '../models/ArtworkOrientationEnum';
import type { ArtWorkStatus } from '../models/ArtWorkStatus';
import type { MainAdminArtworkGetIdResponseDto } from '../models/MainAdminArtworkGetIdResponseDto';
import type { MainAdminArtworkGetResponseDto } from '../models/MainAdminArtworkGetResponseDto';
import type { MainAdminArtworkPutRequestDto } from '../models/MainAdminArtworkPutRequestDto';
import type { SortOrder } from '../models/SortOrder';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AdminArtworkService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get artwork. [ACCESS: Required access functions: main.adminArtwork:get]
     * @returns MainAdminArtworkGetIdResponseDto Artwork
     * @throws ApiError
     */
    public adminArtworkControllerGetArtwork({
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
    }): CancelablePromise<MainAdminArtworkGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/artwork/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update artwork. [ACCESS: Required access functions: main.artwork:update]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public adminArtworkControllerUpdateArtwork({
        id,
        requestBody,
    }: {
        /**
         * Artwork identifier
         */
        id: number,
        requestBody: MainAdminArtworkPutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/artwork/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get artworks. [ACCESS: Required access functions: main.adminArtwork:get]
     * @returns MainAdminArtworkGetResponseDto Artworks
     * @throws ApiError
     */
    public adminArtworkControllerGetArtworks({
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
        authorId,
        ownerId,
        isModerated,
        isPublic,
        isActive,
        contentLanguage,
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
        /**
         * Id of author
         */
        authorId?: string,
        /**
         * Id of owner
         */
        ownerId?: string,
        /**
         * Is moderated
         */
        isModerated?: boolean,
        /**
         * Is public
         */
        isPublic?: boolean,
        /**
         * Is active
         */
        isActive?: boolean,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainAdminArtworkGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/artwork',
            headers: {
                'Content-Language': contentLanguage,
            },
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
                'author_id': authorId,
                'owner_id': ownerId,
                'is_moderated': isModerated,
                'is_public': isPublic,
                'is_active': isActive,
            },
        });
    }
}
