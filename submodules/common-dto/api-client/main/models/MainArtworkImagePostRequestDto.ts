/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkImageRatio } from './ArtWorkImageRatio';
import type { ArtWorkImageSide } from './ArtWorkImageSide';
export type MainArtworkImagePostRequestDto = {
    /**
     * ID of image
     */
    image_id: string;
    /**
     * ID of artwork
     */
    artwork_id: number;
    side: ArtWorkImageSide;
    ratio: ArtWorkImageRatio;
};

