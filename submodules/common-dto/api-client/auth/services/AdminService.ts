/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { AuthAdminGetGroupsListResponseDto } from '../models/AuthAdminGetGroupsListResponseDto';
import type { AuthAdminGetUsersListResponseDto } from '../models/AuthAdminGetUsersListResponseDto';
import type { AuthAdminPostGroupsAddUserRequestDto } from '../models/AuthAdminPostGroupsAddUserRequestDto';
import type { AuthAdminPostGroupsRemoveUserRequestDto } from '../models/AuthAdminPostGroupsRemoveUserRequestDto';

import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';

export class AdminService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get list of users groups. [ACCESS: Required user groups: Admin]
     * @returns AuthAdminGetGroupsListResponseDto List of users groups
     * @throws ApiError
     */
    public adminControllerListGroups({
        email,
    }: {
        /**
         * Email of the User
         */
        email: string,
    }): CancelablePromise<AuthAdminGetGroupsListResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/groups/list',
            query: {
                'email': email,
            },
        });
    }

    /**
     * Add user to specified group. [ACCESS: Required user groups: Admin]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminControllerAddUserToGroup({
        requestBody,
    }: {
        requestBody: AuthAdminPostGroupsAddUserRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/groups/add-user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Remove user from specified group. [ACCESS: Required user groups: Admin]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public adminControllerRemoveUserFromGroup({
        requestBody,
    }: {
        requestBody: AuthAdminPostGroupsRemoveUserRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/admin/groups/remove-user',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get list of users
     * @returns AuthAdminGetUsersListResponseDto List of users
     * @throws ApiError
     */
    public adminControllerListUsers({
        cursor,
    }: {
        /**
         * Pagination cursor to fetch next portion of data
         */
        cursor?: string,
    }): CancelablePromise<AuthAdminGetUsersListResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/users/list',
            query: {
                'cursor': cursor,
            },
        });
    }

}
