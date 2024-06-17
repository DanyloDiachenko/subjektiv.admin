/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminCommentTargetIdType } from './AdminCommentTargetIdType';
import type { UserPreviewDto } from './UserPreviewDto';
export type AdminCommentItemDto = {
    /**
     * ID of comment
     */
    id: number;
    target_type: AdminCommentTargetIdType;
    /**
     * ID of target
     */
    target_id: string;
    /**
     * Text of comment
     */
    text: string;
    /**
     * User who created comment
     */
    user: UserPreviewDto;
    /**
     * Date of creation
     */
    created_at: string;
};

