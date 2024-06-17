/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainArtworkPostCommentPostResponseDto } from '../models/ApiResponse_MainArtworkPostCommentPostResponseDto';
import type { ApiResponse_MainArtworkPostCommentPutResponseDto } from '../models/ApiResponse_MainArtworkPostCommentPutResponseDto';
import type { MainArtworkPostCommentGetResponseDto } from '../models/MainArtworkPostCommentGetResponseDto';
import type { MainArtworkPostCommentPostRequestDto } from '../models/MainArtworkPostCommentPostRequestDto';
import type { MainArtworkPostCommentPutRequestDto } from '../models/MainArtworkPostCommentPutRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkPostCommentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get paginated list of comments for artwork post.
     * @returns MainArtworkPostCommentGetResponseDto Paginated list of comments for artwork posts
     * @throws ApiError
     */
    public artworkPostCommentControllerGetList({
        page,
        authorId,
        postId,
        parentId,
        contentLanguage,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * The ID of the author
         */
        authorId?: string,
        /**
         * The ID of the artwork post
         */
        postId?: number,
        /**
         * The ID of the parent comment. Specify if you looking for replies. By default, its null (comments that are not replies)
         */
        parentId?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkPostCommentGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/post/comment',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                'author_id': authorId,
                'post_id': postId,
                'parent_id': parentId,
            },
        });
    }
    /**
     * Create a comment for an artwork post.
     * @returns ApiResponse_MainArtworkPostCommentPostResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostCommentControllerCreate({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainArtworkPostCommentPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkPostCommentPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/post/comment',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Edit a comment for an artwork post.
     * @returns ApiResponse_MainArtworkPostCommentPutResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostCommentControllerEdit({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainArtworkPostCommentPutRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkPostCommentPutResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/post/comment',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete comment
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostCommentControllerDelete({
        id,
    }: {
        /**
         * Id of the comment to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/post/comment/{id}',
            path: {
                'id': id,
            },
        });
    }
}
