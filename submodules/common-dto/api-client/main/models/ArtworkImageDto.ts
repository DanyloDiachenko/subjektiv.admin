/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkImageRatio } from './ArtWorkImageRatio';
import type { ArtWorkImageSide } from './ArtWorkImageSide';
export type ArtworkImageDto = {
    /**
     * Id of artwork image
     */
    id: number;
    /**
     * Image id of artwork image
     */
    image_id: string;
    /**
     * Artwork id of artwork image
     */
    artwork_id: number;
    side: ArtWorkImageSide;
    ratio: ArtWorkImageRatio;
    /**
     * Format of artwork image
     */
    format: string;
};

