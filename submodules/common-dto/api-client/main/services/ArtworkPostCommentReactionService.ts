/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ArtworkPostReaction } from '../models/ArtworkPostReaction';
import type { MainArtworkPostCommentReactionDeleteRequestDto } from '../models/MainArtworkPostCommentReactionDeleteRequestDto';
import type { MainArtworkPostCommentReactionGetResponseDto } from '../models/MainArtworkPostCommentReactionGetResponseDto';
import type { MainArtworkPostCommentReactionPostRequestDto } from '../models/MainArtworkPostCommentReactionPostRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkPostCommentReactionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get paginated list of reactions for artwork post comment.
     * @returns MainArtworkPostCommentReactionGetResponseDto Paginated list of reactions for artwork post comments
     * @throws ApiError
     */
    public artworkPostCommentReactionControllerGetList({
        page,
        userId,
        commentId,
        reactionType,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * The ID of the user
         */
        userId?: string,
        /**
         * The ID of the comment
         */
        commentId?: number,
        /**
         * Typeof reaction
         */
        reactionType?: ArtworkPostReaction,
    }): CancelablePromise<MainArtworkPostCommentReactionGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/post/comment/reaction',
            query: {
                'page': page,
                'user_id': userId,
                'comment_id': commentId,
                'reaction_type': reactionType,
            },
        });
    }
    /**
     * Add reaction for an artwork post comment.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostCommentReactionControllerSetReaction({
        requestBody,
    }: {
        requestBody: MainArtworkPostCommentReactionPostRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/post/comment/reaction',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove reaction for an artwork post comment.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public artworkPostCommentReactionControllerUnsetReaction({
        requestBody,
    }: {
        requestBody: MainArtworkPostCommentReactionDeleteRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/post/comment/reaction',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
