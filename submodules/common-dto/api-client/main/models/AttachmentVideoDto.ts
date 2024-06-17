/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageRatioEnum } from './ImageRatioEnum';
import type { VideoVariantDto } from './VideoVariantDto';
export type AttachmentVideoDto = {
    /**
     * ID of file used by storage service to update upload state
     */
    file_id: string;
    /**
     * Flag indicating that attachment is uploaded
     */
    is_uploaded: boolean;
    ratio: ImageRatioEnum;
    /**
     * Duration of video
     */
    duration: number;
    /**
     * Array of variants of video
     */
    variants: Array<VideoVariantDto>;
    /**
     * Thumbnail size variants
     */
    thumbnails: Record<string, string>;
};

