/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachmentImageDto } from './AttachmentImageDto';
import type { AttachmentType } from './AttachmentType';
import type { AttachmentVideoDto } from './AttachmentVideoDto';
export type AttachmentInputDto = {
    type: AttachmentType;
    /**
     * The additional data of the attachment
     */
    additional_data: (AttachmentImageDto | AttachmentVideoDto);
    /**
     * The creation date of the attachment
     */
    created_at?: string;
    /**
     * The ID of the attachment
     */
    id?: number;
};

