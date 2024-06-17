/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminCommentTargetIdType } from '../models/AdminCommentTargetIdType';
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainAdminCommentGetResponseDto } from '../models/MainAdminCommentGetResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AdminCommentService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of comments. [ACCESS: Required access functions: main.adminComment:get]
     * @returns MainAdminCommentGetResponseDto List of comments
     * @throws ApiError
     */
    public adminCommentControllerGetList({
        targetType,
        targetId,
        page,
    }: {
        /**
         * Typeof target
         */
        targetType: AdminCommentTargetIdType,
        /**
         * Target ID
         */
        targetId: string,
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainAdminCommentGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/comment',
            query: {
                'page': page,
                'target_type': targetType,
                'target_id': targetId,
            },
        });
    }
    /**
     * Create admin comment. [ACCESS: Required access functions: main.adminComment:create]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminCommentControllerPost({
        targetType,
        targetId,
        text,
    }: {
        /**
         * Typeof target
         */
        targetType: AdminCommentTargetIdType,
        /**
         * Target ID
         */
        targetId: string,
        /**
         * Text of comment
         */
        text: string,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/comment',
            query: {
                'target_type': targetType,
                'target_id': targetId,
                'text': text,
            },
        });
    }
}
