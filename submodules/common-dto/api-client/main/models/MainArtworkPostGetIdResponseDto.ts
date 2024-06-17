/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPostType } from './ArtworkPostType';
import type { ArtworkPreviewWithAuthorDto } from './ArtworkPreviewWithAuthorDto';
import type { AttachmentPublicDto } from './AttachmentPublicDto';
import type { MainArtworkPostGetResponseCommentDto } from './MainArtworkPostGetResponseCommentDto';
import type { UserDto } from './UserDto';
export type MainArtworkPostGetIdResponseDto = {
    /**
     * The ID of the artwork post
     */
    id: number;
    /**
     * Artwork related to post
     */
    artwork: ArtworkPreviewWithAuthorDto;
    /**
     * Author of artwork post
     */
    author: UserDto;
    post_type: ArtworkPostType;
    /**
     * The text of the artwork post
     */
    text: string;
    /**
     * The attachments of the artwork post
     */
    attachments: Array<string>;
    /**
     * Array of attachments
     */
    post_attachments: Array<AttachmentPublicDto>;
    /**
     * The additional data of the artwork post
     */
    additional_data: Record<string, any> | null;
    /**
     * The number of views
     */
    views_count: number;
    /**
     * Specifies if the artwork post is published
     */
    is_published: boolean;
    /**
     * Is this post public
     */
    is_public: boolean | null;
    /**
     * Specifies if the artwork post is active
     */
    is_active: boolean;
    /**
     * The date of the last update
     */
    update_date: string;
    /**
     * The date of publishing
     */
    publish_date: string;
    /**
     * The creation date of the artwork post
     */
    created_at: string;
    /**
     * Comments of the artwork
     */
    comments: MainArtworkPostGetResponseCommentDto;
    /**
     * The number of comments
     */
    comments_count: number;
};

