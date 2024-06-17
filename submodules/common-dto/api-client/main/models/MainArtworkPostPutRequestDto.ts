/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPostTypesAllowedForUser } from './ArtworkPostTypesAllowedForUser';
import type { AttachmentInputDto } from './AttachmentInputDto';
import type { MainArtworkPostTypeEventDto } from './MainArtworkPostTypeEventDto';
export type MainArtworkPostPutRequestDto = {
    /**
     * The text of the artwork
     */
    text?: string;
    /**
     * The attachments of the artwork
     */
    attachments?: Array<string>;
    /**
     * Array of attachments
     */
    post_attachments?: Array<AttachmentInputDto>;
    /**
     * Is artwork post published
     */
    is_published?: boolean;
    /**
     * Is artwork post active
     */
    is_active?: boolean;
    /**
     * Publish date
     */
    publish_date?: string;
    /**
     * Is artwork post public (visible in common feed)
     */
    is_public?: boolean;
    type?: ArtworkPostTypesAllowedForUser;
    additional_data?: MainArtworkPostTypeEventDto;
};

