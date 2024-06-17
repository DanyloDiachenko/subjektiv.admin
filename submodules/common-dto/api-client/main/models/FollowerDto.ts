/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProfileTypeEnum } from './ProfileTypeEnum';
export type FollowerDto = {
    /**
     * Id of user
     */
    id: string;
    /**
     * Users ID used for building chat identifiers
     */
    chat_id: string;
    /**
     * The username of the user
     */
    username: string;
    /**
     * The first name of the user
     */
    first_name: string | null;
    /**
     * The last name of the user
     */
    last_name: string | null;
    /**
     * The ID of the user avatar
     */
    avatar_id: string | null;
    /**
     * The position of the user
     */
    position: string | null;
    /**
     * The email of the user
     */
    email: string;
    profile_type: ProfileTypeEnum;
    /**
     * Indicates whether the authorized user is following this user
     */
    is_following: boolean;
};

