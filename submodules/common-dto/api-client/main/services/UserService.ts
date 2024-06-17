/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainUserCanICreateOrderResponseDto } from '../models/MainUserCanICreateOrderResponseDto';
import type { MainUserGetChatCredentialsResponseDto } from '../models/MainUserGetChatCredentialsResponseDto';
import type { MainUserGetMeResponseDto } from '../models/MainUserGetMeResponseDto';
import type { MainUserGetResponseDto } from '../models/MainUserGetResponseDto';
import type { MainUserGetUsernameCheckResponseDto } from '../models/MainUserGetUsernameCheckResponseDto';
import type { MainUserGetUsernameResponseDto } from '../models/MainUserGetUsernameResponseDto';
import type { MainUserPatchMeRequestDto } from '../models/MainUserPatchMeRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get own user info
     * @returns MainUserGetMeResponseDto User info
     * @throws ApiError
     */
    public userControllerGetMe({
        contentLanguage,
    }: {
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainUserGetMeResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/me',
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update own user info.
     * @returns ApiResponse_ApiOkResponseDto Operation complete
     * @throws ApiError
     */
    public userControllerUpdateUser({
        requestBody,
    }: {
        requestBody: MainUserPatchMeRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/user/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user by username
     * @returns MainUserGetUsernameResponseDto User info
     * @throws ApiError
     */
    public userControllerGetByUsername({
        username,
        contentLanguage,
    }: {
        /**
         * Username of user to get
         */
        username: string,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainUserGetUsernameResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/{username}',
            path: {
                'username': username,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Delete user. To delete any user: [ACCESS: Required access functions: main.adminUser:update]
     * @returns ApiResponse_ApiOkResponseDto Operation complete
     * @throws ApiError
     */
    public userControllerDeleteUser({
        username,
    }: {
        /**
         * Username of user to delete
         */
        username: string,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/user/{username}',
            path: {
                'username': username,
            },
        });
    }
    /**
     * Get users
     * @returns MainUserGetResponseDto Users
     * @throws ApiError
     */
    public userControllerGetAll({
        page,
        search,
        isArtist,
        isFeaturedArtist,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Search by username, first name, last name.
         */
        search?: string,
        /**
         * Is artist?
         */
        isArtist?: boolean,
        /**
         * Is featured artist?
         */
        isFeaturedArtist?: boolean,
    }): CancelablePromise<MainUserGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user',
            query: {
                'page': page,
                'search': search,
                'is_artist': isArtist,
                'is_featured_artist': isFeaturedArtist,
            },
        });
    }
    /**
     * Post request to be an expert
     * @returns ApiResponse_ApiOkResponseDto Operation complete
     * @throws ApiError
     */
    public userControllerIAmExpert(): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/user/expert/become',
        });
    }
    /**
     * Check username availability and suggest alternatives
     * @returns MainUserGetUsernameCheckResponseDto Username availability and suggestions
     * @throws ApiError
     */
    public userControllerCheckUsernameAvailability({
        username,
    }: {
        /**
         * UserName
         */
        username: string,
    }): CancelablePromise<MainUserGetUsernameCheckResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/username/check',
            query: {
                'username': username,
            },
        });
    }
    /**
     * Get user by id
     * @returns MainUserCanICreateOrderResponseDto User info
     * @throws ApiError
     */
    public userControllerCanICreateOrder(): CancelablePromise<MainUserCanICreateOrderResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/can-i-create-orders',
        });
    }
    /**
     * Get user chat credentials
     * @returns MainUserGetChatCredentialsResponseDto Actual user chat credentials
     * @throws ApiError
     */
    public userControllerGetChatCredentials(): CancelablePromise<MainUserGetChatCredentialsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/chat-credentials',
        });
    }
    /**
     * Get support user chat credentials
     * @returns MainUserGetChatCredentialsResponseDto Support user chat credentials
     * @throws ApiError
     */
    public userControllerGetChatCredentialsAsSupport(): CancelablePromise<MainUserGetChatCredentialsResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/user/chat-credentials/support',
        });
    }
}
