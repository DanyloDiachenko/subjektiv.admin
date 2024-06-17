/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MainAdminArtworkPutRequestDto = {
    /**
     * Is artwork moderated
     */
    is_moderated?: boolean;
    /**
     * Is artwork active
     */
    is_active?: boolean;
    /**
     * Is artwork public (can be shown in common feed)
     */
    is_public?: boolean;
    /**
     * Is artwork published
     */
    is_published?: boolean;
    /**
     * Is artwork factual weight
     */
    is_factual_weight?: boolean;
    /**
     * Is artwork marked as missing details is completed
     */
    is_missing_details_completed?: boolean;
    /**
     * Private owner's address specified for this artwork
     */
    address_id?: number | null;
};

