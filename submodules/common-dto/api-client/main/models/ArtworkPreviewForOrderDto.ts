/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { ImagePreviewDto } from './ImagePreviewDto';
import type { PackagingType } from './PackagingType';
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkPreviewForOrderDto = {
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
    /**
     * The author of the artwork
     */
    author: UserPreviewDto;
    /**
     * The ID of the certificate file
     */
    certificate_file_path: string | null;
    packaging_types: Array<PackagingType>;
    /**
     * Volumetric weight
     */
    volumetric_weight: number;
    /**
     * Height of the artwork
     */
    height: number;
    /**
     * Width of the artwork
     */
    width: number;
    /**
     * Depth of the artwork
     */
    depth: number;
    /**
     * Weight of the artwork
     */
    weight: number;
};

