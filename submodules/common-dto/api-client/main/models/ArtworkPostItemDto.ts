/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPostType } from './ArtworkPostType';
import type { ArtworkPreviewWithAuthorDto } from './ArtworkPreviewWithAuthorDto';
import type { AttachmentPublicDto } from './AttachmentPublicDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkPostItemDto = {
    /**
     * The ID of the artwork post
     */
    id: number;
    /**
     * The artwork of the artwork post
     */
    artwork: ArtworkPreviewWithAuthorDto;
    /**
     * The author of the artwork post
     */
    author: UserPreviewDto;
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
    additional_data: Record<string, any>;
    /**
     * The number of views
     */
    views_count: number;
    /**
     * Specifies if the artwork post is published
     */
    is_published: boolean;
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
     * Specifies if the artwork post is active
     */
    is_active: boolean;
    /**
     * Specifies if the artwork is saved into users saved collection
     */
    is_saved: boolean;
    /**
     * Is this post owned by user
     */
    is_my: boolean;
    /**
     * The number of comments
     */
    comments_count: number;
    /**
     * Is this post public
     */
    is_public: boolean;
};

