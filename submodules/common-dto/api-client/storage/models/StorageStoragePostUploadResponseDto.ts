/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageRatioEnum } from './ImageRatioEnum';
export type StorageStoragePostUploadResponseDto = {
    /**
     * Image id
     */
    image_id: string;
    ratio: ImageRatioEnum | null;
    /**
     * Image size variants
     */
    sizes: Record<string, string>;
};

