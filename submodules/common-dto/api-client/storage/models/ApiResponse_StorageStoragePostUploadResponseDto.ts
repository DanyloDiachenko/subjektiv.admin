/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImageRatioEnum } from './ImageRatioEnum';
export type ApiResponse_StorageStoragePostUploadResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
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
};

