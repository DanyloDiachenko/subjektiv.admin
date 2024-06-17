/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainArtworkPostPostResponseDto } from '../models/ApiResponse_MainArtworkPostPostResponseDto';
import type { ArtworkPostType } from '../models/ArtworkPostType';
import type { MainArtworkPostGetFeedResponseDto } from '../models/MainArtworkPostGetFeedResponseDto';
import type { MainArtworkPostGetIdResponseDto } from '../models/MainArtworkPostGetIdResponseDto';
import type { MainArtworkPostGetResponseDto } from '../models/MainArtworkPostGetResponseDto';
import type { MainArtworkPostPostRequestDto } from '../models/MainArtworkPostPostRequestDto';
import type { MainArtworkPostPutRequestDto } from '../models/MainArtworkPostPutRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkPostService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get artwork post by id. To view inactive or unpublished: [ACCESS: Required access functions: main.artworkPost:viewAll]
     * @returns MainArtworkPostGetIdResponseDto Artwork post
     * @throws ApiError
     */
    public artworkPostControllerGetArtworkPost({
        id,
        contentLanguage,
    }: {
        /**
         * Id of the artwork post to get
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkPostGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/post/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update artwork post. If you not post owner, or want to change is_active field: [ACCESS: Required access functions: main.artworkPost:update]
     * @returns ApiResponse_ApiOkResponseDto Updated artwork post
     * @throws ApiError
     */
    public artworkPostControllerPutId({
        id,
        requestBody,
    }: {
        /**
         * Id of the artwork post to update
         */
        id: number,
        requestBody: MainArtworkPostPutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/post/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete artwork post
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostControllerDeletePost({
        id,
    }: {
        /**
         * Id of the post to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/post/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get paginated list of posts for artworks. To see unpublished or inactive: [ACCESS: Required access functions: main.artworkPost:viewAll]
     * @returns MainArtworkPostGetResponseDto Paginated list of posts for artworks
     * @throws ApiError
     */
    public artworkPostControllerGetPosts({
        page,
        authorUsername,
        artworkId,
        isPublished,
        isActive,
        postTypes,
        postIds,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * The username of the author
         */
        authorUsername?: string,
        /**
         * The ID of the artwork
         */
        artworkId?: number,
        /**
         * Specifies if the artwork post is published. Unpublished posts are visible only for author or admin
         */
        isPublished?: boolean,
        /**
         * Specifies if the artwork post is active. Inactive posts visible only for admins.
         */
        isActive?: boolean,
        /**
         * Artwork post types
         */
        postTypes?: Array<ArtworkPostType>,
        /**
         * Post IDs
         */
        postIds?: Array<number>,
    }): CancelablePromise<MainArtworkPostGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/post',
            query: {
                'page': page,
                'author_username': authorUsername,
                'artwork_id': artworkId,
                'is_published': isPublished,
                'is_active': isActive,
                'post_types': postTypes,
                'post_ids': postIds,
            },
        });
    }
    /**
     * Create a post for an artwork.
     * @returns ApiResponse_MainArtworkPostPostResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostControllerCreatePost({
        requestBody,
    }: {
        requestBody: MainArtworkPostPostRequestDto,
    }): CancelablePromise<ApiResponse_MainArtworkPostPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/post',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get feed of artwork posts
     * @returns MainArtworkPostGetFeedResponseDto List of artwork posts in the feed
     * @throws ApiError
     */
    public artworkPostControllerGetFeed({
        cursor,
        artworkId,
        isFollowing,
    }: {
        /**
         * The last cursor, from which continue list
         */
        cursor?: string,
        /**
         * Artwork id
         */
        artworkId?: number,
        /**
         * See feed from followings or from all users.
         */
        isFollowing?: boolean,
    }): CancelablePromise<MainArtworkPostGetFeedResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/post/feed',
            query: {
                'cursor': cursor,
                'artwork_id': artworkId,
                'is_following': isFollowing,
            },
        });
    }
}
