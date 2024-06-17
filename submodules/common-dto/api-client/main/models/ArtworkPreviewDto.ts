/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { ImagePreviewDto } from './ImagePreviewDto';
export type ArtworkPreviewDto = {
    /**
     * The ID of the artwork
     */
    id: number;
    /**
     * The title of the artwork
     */
    title: string | null;
    /**
     * Main artwork image
     */
    main_image: ImagePreviewDto | null;
    /**
     * The dominant HSB color of the artwork image
     */
    dominant_hsb_color: Array<number>;
    status: ArtWorkStatus;
};

