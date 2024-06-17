/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkCommentQuestionDto } from './ArtworkCommentQuestionDto';
import type { ArtworkPostCommentInternalDto } from './ArtworkPostCommentInternalDto';
import type { AttachmentPublicDto } from './AttachmentPublicDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkPostCommentPutResponseDto = {
    /**
     * The ID of the comment
     */
    id: number;
    /**
     * The ID of the parent comment
     */
    parent_id: number | null;
    /**
     * The author of the comment
     */
    author: UserPreviewDto;
    /**
     * The text of the comment
     */
    text: string;
    /**
     * The date of the last update
     */
    update_date: string;
    /**
     * The creation date of the artwork post
     */
    created_at: string;
    /**
     * The number of reactions by their type
     */
    reactions_count: Record<string, string>;
    /**
     * Array of attachments
     */
    attachments: Array<AttachmentPublicDto>;
    /**
     * The number of comments
     */
    comments_count: number;
    /**
     * Comment question
     */
    comment_question: ArtworkCommentQuestionDto | null;
    /**
     * The comment to which this comment is a reply
     */
    reply_to: ArtworkPostCommentInternalDto | null;
    /**
     * Array of my reactions
     */
    my_reactions: Array<'like' | 'dislike'>;
};

