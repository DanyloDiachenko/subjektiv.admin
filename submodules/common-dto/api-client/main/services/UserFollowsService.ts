/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainUserGetFollowersUsernameResponseDto } from '../models/MainUserGetFollowersUsernameResponseDto';
import type { MainUserGetFollowingsUsernameResponseDto } from '../models/MainUserGetFollowingsUsernameResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class UserFollowsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Follow the user
     * @returns any
     * @throws ApiError
     */
    public userFollowsControllerFollow({
        username,
    }: {
        /**
         * Username of the user to follow
         */
        username: string,
    }): CancelablePromise<{
        /**
         * Indicates whether the request was successful
         */
        success?: boolean;
        /**
         * Response data
         */
        data?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/follows/{username}',
            path: {
                'username': username,
            },
        });
    }
    /**
     * Unfollow the user
     * @returns any
     * @throws ApiError
     */
    public userFollowsControllerUnfollow({
        username,
    }: {
        /**
         * Username of the user to unfollow
         */
        username: string,
    }): CancelablePromise<{
        /**
         * Indicates whether the request was successful
         */
        success?: boolean;
        /**
         * Response data
         */
        data?: Record<string, any>;
    }> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user/follows/{username}',
            path: {
                'username': username,
            },
        });
    }
    /**
     * Get users that the user follows
     * @returns MainUserGetFollowersUsernameResponseDto Users that the user follows
     * @throws ApiError
     */
    public userFollowsControllerGetFollowers({
        username,
        s,
        page,
    }: {
        /**
         * Username of the user to get follows of
         */
        username: string,
        /**
         * Search string by username, first name or last name
         */
        s?: string,
        /**
         * Page number to find
         */
        page?: number,
    }): CancelablePromise<MainUserGetFollowersUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/follows/followers/{username}',
            path: {
                'username': username,
            },
            query: {
                's': s,
                'page': page,
            },
        });
    }
    /**
     * Get users that follow the user
     * @returns MainUserGetFollowingsUsernameResponseDto Users that follow the user
     * @throws ApiError
     */
    public userFollowsControllerGetFollowings({
        username,
        s,
        page,
    }: {
        /**
         * Username of the user to get followers of
         */
        username: string,
        /**
         * Search string by username, first name or last name
         */
        s?: string,
        /**
         * Page number to find
         */
        page?: number,
    }): CancelablePromise<MainUserGetFollowingsUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/follows/followings/{username}',
            path: {
                'username': username,
            },
            query: {
                's': s,
                'page': page,
            },
            errors: {
                404: `USER_NOT_FOUND`,
            },
        });
    }
}
