/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainArtworkCommentQuestionPostResponseDto } from '../models/ApiResponse_MainArtworkCommentQuestionPostResponseDto';
import type { ApiResponse_MainArtworkCommentQuestionPutIdResponseDto } from '../models/ApiResponse_MainArtworkCommentQuestionPutIdResponseDto';
import type { MainArtworkCommentQuestionGetIdResponseDto } from '../models/MainArtworkCommentQuestionGetIdResponseDto';
import type { MainArtworkCommentQuestionGetResponseDto } from '../models/MainArtworkCommentQuestionGetResponseDto';
import type { MainArtworkCommentQuestionPostRequestDto } from '../models/MainArtworkCommentQuestionPostRequestDto';
import type { MainArtworkCommentQuestionPutIdRequestDto } from '../models/MainArtworkCommentQuestionPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class CommentQuestionService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get comment questions
     * @returns MainArtworkCommentQuestionGetResponseDto Comment questions
     * @throws ApiError
     */
    public artworkCommentQuestionControllerGetAll({
        page,
        contentLanguage,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkCommentQuestionGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/comment-question',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
            },
        });
    }
    /**
     * Create comment question. [ACCESS: Required access functions: main.commentQuestion:create]
     * @returns ApiResponse_MainArtworkCommentQuestionPostResponseDto
     * @throws ApiError
     */
    public artworkCommentQuestionControllerCreateCommentQuestion({
        requestBody,
        contentLanguage,
    }: {
        requestBody: MainArtworkCommentQuestionPostRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkCommentQuestionPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/comment-question',
            headers: {
                'Content-Language': contentLanguage,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get comment question
     * @returns MainArtworkCommentQuestionGetIdResponseDto Comment question object
     * @throws ApiError
     */
    public artworkCommentQuestionControllerGetCommentQuestion({
        id,
        contentLanguage,
    }: {
        /**
         * Country identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainArtworkCommentQuestionGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/comment-question/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update comment question. [ACCESS: Required access functions: main.commentQuestion:update]
     * @returns ApiResponse_MainArtworkCommentQuestionPutIdResponseDto
     * @throws ApiError
     */
    public artworkCommentQuestionControllerUpdateCommentQuestion({
        id,
        requestBody,
        contentLanguage,
    }: {
        /**
         * Country identifier
         */
        id: number,
        requestBody: MainArtworkCommentQuestionPutIdRequestDto,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkCommentQuestionPutIdResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/comment-question/{id}',
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
    /**
     * Delete comment question. [ACCESS: Required access functions: main.commentQuestion:delete]
     * @returns any
     * @throws ApiError
     */
    public artworkCommentQuestionControllerDeleteCommentQuestion({
        id,
    }: {
        /**
         * Country identifier
         */
        id: number,
    }): CancelablePromise<{
        /**
         * Indicates whether the request was successful
         */
        success?: boolean;
        /**
         * Response data
         */
        data?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/comment-question/{id}',
            path: {
                'id': id,
            },
        });
    }
}
