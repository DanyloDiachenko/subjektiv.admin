/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachmentInputDto } from './AttachmentInputDto';
import type { MainArtworkPostCustomDto } from './MainArtworkPostCustomDto';
export type MainArtworkPostPostRequestDto = {
    /**
     * The ID of the artwork
     */
    artwork_id: number;
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
     * If you want to create post with non-standard type
     */
    type_data?: MainArtworkPostCustomDto;
    /**
     * The date of the publish
     */
    publish_date?: string;
};

