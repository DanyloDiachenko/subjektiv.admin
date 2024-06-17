/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkReviewStatusUpdateEnum } from './ArtworkReviewStatusUpdateEnum';
export type MainArtworkReviewPutIdRequestDto = {
    /**
     * The title of the artwork review
     */
    title?: string;
    /**
     * The description of the artwork review
     */
    description?: string;
    status?: ArtworkReviewStatusUpdateEnum;
};

