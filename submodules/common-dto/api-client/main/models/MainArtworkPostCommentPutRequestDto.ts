/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachmentInputDto } from './AttachmentInputDto';
export type MainArtworkPostCommentPutRequestDto = {
    /**
     * The ID of the comment to edit
     */
    comment_id: number;
    /**
     * The text of the comment
     */
    text?: string;
    /**
     * Array of attachments
     */
    attachments?: Array<AttachmentInputDto>;
};

