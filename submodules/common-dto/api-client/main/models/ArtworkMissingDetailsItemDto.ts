/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { CategoryItemDto } from './CategoryItemDto';
import type { ImagePreviewDto } from './ImagePreviewDto';
import type { PackagingType } from './PackagingType';
export type ArtworkMissingDetailsItemDto = {
    /**
     * Is artwork marked as missing details is completed
     */
    is_missing_details_completed: boolean;
    /**
     * Id of artwork
     */
    id: number;
    /**
     * Localized title of artwork
     */
    title: string | null;
    /**
     * Front image of artwork
     */
    main_image: ImagePreviewDto | null;
    status: ArtWorkStatus;
    /**
     * Category
     */
    category: CategoryItemDto | null;
    /**
     * Private address accessible by owner only (not author!)
     */
    address_id: number | null;
    /**
     * Is artwork will be packed for selling by owner. Seen only by owner.
     */
    is_packed_by_me: boolean | null;
    /**
     * Weight of artwork
     */
    weight: number;
    /**
     * Volumetric weight of artwork
     */
    volumetric_weight: number;
    /**
     * Is artwork factual weight
     */
    is_factual_weight: boolean | null;
    /**
     * The ID of the certificate file
     */
    certificate_file_path: string | null;
    packaging_types: Array<PackagingType>;
    /**
     * Is artwork mounted
     */
    is_mounted: boolean;
};

