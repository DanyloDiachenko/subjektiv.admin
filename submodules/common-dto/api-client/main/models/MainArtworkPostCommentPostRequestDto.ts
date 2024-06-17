/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachmentInputDto } from './AttachmentInputDto';
export type MainArtworkPostCommentPostRequestDto = {
    /**
     * The ID of the artwork post
     */
    artwork_post_id: number;
    /**
     * The ID of the target comment
     */
    target_id?: number;
    /**
     * The ID of the comment question
     */
    artwork_comment_question_id?: number | null;
    /**
     * The text of the comment
     */
    text: string;
    /**
     * Array of attachments
     */
    attachments?: Array<AttachmentInputDto>;
};

