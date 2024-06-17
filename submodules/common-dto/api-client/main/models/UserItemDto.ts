/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkPreviewDto } from './ArtworkPreviewDto';
export type UserItemDto = {
    /**
     * Id of user
     */
    id: string;
    /**
     * Username of user
     */
    username: string;
    /**
     * Email of user
     */
    email: string;
    /**
     * First name of user
     */
    first_name: string | null;
    /**
     * Last name of user
     */
    last_name: string | null;
    /**
     * Avatar id of user
     */
    avatar_id: string | null;
    /**
     * Description of user
     */
    description: string | null;
    /**
     * Do you follow this user?
     */
    is_following: boolean;
    /**
     * Array of latest added artworks
     */
    latest_artworks: Array<ArtworkPreviewDto>;
};

