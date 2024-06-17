/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ImagePreviewDto } from './ImagePreviewDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkSuggestionDto = {
    /**
     * Id of artwork
     */
    id: number;
    /**
     * Title of artwork
     */
    title?: string | null;
    /**
     * Image of artwork
     */
    main_image: ImagePreviewDto | null;
    /**
     * Author of artwork
     */
    author: UserPreviewDto;
};

