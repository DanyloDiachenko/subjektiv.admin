/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { PackagingType } from './PackagingType';
export type MainArtworkPostRequestDto = {
    /**
     * Certificate file
     */
    certificate_file_path?: string | null;
    /**
     * Title of artwork
     */
    title?: string;
    /**
     * Description of artwork
     */
    description?: string;
    /**
     * Category of artwork
     */
    category_id?: number;
    /**
     * Keywords of artwork
     */
    keyword_ids?: Array<number>;
    /**
     * Materials of artwork
     */
    material_ids?: Array<number>;
    /**
     * Style of artwork
     */
    style_id?: number;
    /**
     * Subject of artwork
     */
    subject_id?: number;
    /**
     * Height of artwork
     */
    height?: number;
    /**
     * Width of artwork
     */
    width?: number;
    /**
     * Length of artwork
     */
    length?: number;
    /**
     * Depth of artwork
     */
    depth?: number;
    /**
     * Weight of artwork
     */
    weight?: number;
    /**
     * Year of artwork
     */
    year?: number;
    packaging_types?: Array<PackagingType>;
    /**
     * Is artwork will be packed for selling by owner. Seen only by owner.
     */
    is_packed_by_me?: boolean | null;
    /**
     * Is artwork mounted. Seen only by owner.
     */
    is_mounted?: boolean;
    /**
     * Price of artwork
     */
    price?: number;
    status?: ArtWorkStatus;
    /**
     * Is artwork active. To change this field: [ACCESS: Required access functions: main.artwork:update]
     */
    is_active?: boolean;
    /**
     * Is artwork published
     */
    is_published?: boolean;
    /**
     * Is artwork good enough to be in feed. To change this field: [ACCESS: Required access functions: main.artwork:update]
     */
    is_public?: boolean;
};

