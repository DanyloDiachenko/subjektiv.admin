/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserPreviewWithIsFollowingDto } from './UserPreviewWithIsFollowingDto';
export type MainUserExpertGetResponseDto = {
    /**
     * Current page
     */
    current_page: number;
    /**
     * Total number of items
     */
    total: number;
    /**
     * Total count of pages
     */
    total_pages: number;
    /**
     * Page size
     */
    size: number;
    /**
     * List of experts
     */
    items: Array<UserPreviewWithIsFollowingDto>;
    /**
     * List of interested experts
     */
    interested_experts: Array<UserPreviewWithIsFollowingDto>;
};

