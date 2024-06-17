/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkPostCommentReactionDto = {
    /**
     * The ID of the reaction
     */
    id: number;
    /**
     * The ID of the target comment
     */
    comment_id: number;
    /**
     * User who left this reaction
     */
    user: UserPreviewDto;
    /**
     * The text of the comment
     */
    reaction_type: ArtworkPostCommentReactionDto.reaction_type;
    /**
     * The creation date of the reaction
     */
    created_at: string;
};
export namespace ArtworkPostCommentReactionDto {
    /**
     * The text of the comment
     */
    export enum reaction_type {
        LIKE = 'like',
        DISLIKE = 'dislike',
    }
}

