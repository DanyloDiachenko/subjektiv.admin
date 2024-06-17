/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminUserSortingFields } from '../models/AdminUserSortingFields';
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainAdminUserGetIdResponseDto } from '../models/MainAdminUserGetIdResponseDto';
import type { MainAdminUserGetResponseDto } from '../models/MainAdminUserGetResponseDto';
import type { MainAdminUserPatchUsernameRequestDto } from '../models/MainAdminUserPatchUsernameRequestDto';
import type { SortOrder } from '../models/SortOrder';
import type { UserVerificationStatus } from '../models/UserVerificationStatus';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AdminUserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of users. [ACCESS: Required access functions: main.adminUser:get]
     * @returns MainAdminUserGetResponseDto List of users
     * @throws ApiError
     */
    public adminUserControllerGetList({
        page,
        sortField,
        sortOrder,
        search,
        verificationStatuses,
        isArtist,
        isExpert,
        isExpertWanted,
        countryIds,
        email,
        isWantedVerifyStatus,
        contentLanguage,
    }: {
        /**
         * Page number.
         */
        page?: number,
        /**
         * Field to sort which
         */
        sortField?: AdminUserSortingFields,
        /**
         * Sort order
         */
        sortOrder?: SortOrder,
        /**
         * Search by username, first name, last name.
         */
        search?: string,
        /**
         * user verification statuses
         */
        verificationStatuses?: Array<UserVerificationStatus>,
        /**
         * Is user artist
         */
        isArtist?: boolean,
        /**
         * Is user expert
         */
        isExpert?: boolean,
        /**
         * Is user wants to be an expert
         */
        isExpertWanted?: boolean,
        /**
         * Country IDs
         */
        countryIds?: Array<number>,
        /**
         * Email of user
         */
        email?: string,
        /**
         * Is user have some verification status inProgress
         */
        isWantedVerifyStatus?: boolean,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainAdminUserGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/user',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'page': page,
                'sortField': sortField,
                'sortOrder': sortOrder,
                'search': search,
                'verification_statuses': verificationStatuses,
                'is_artist': isArtist,
                'is_expert': isExpert,
                'is_expert_wanted': isExpertWanted,
                'country_ids': countryIds,
                'email': email,
                'is_wanted_verify_status': isWantedVerifyStatus,
            },
        });
    }
    /**
     * Get user by id. [ACCESS: Required access functions: main.adminUser:get]
     * @returns MainAdminUserGetIdResponseDto User object
     * @throws ApiError
     */
    public adminUserControllerGetById({
        id,
        contentLanguage,
    }: {
        /**
         * User id
         */
        id: string,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainAdminUserGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/user/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update user info
     * @returns ApiResponse_ApiOkResponseDto Operation complete
     * @throws ApiError
     */
    public adminUserControllerUpdateUser({
        username,
        requestBody,
    }: {
        /**
         * Username of user to update
         */
        username: string,
        requestBody: MainAdminUserPatchUsernameRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/admin/user/{username}',
            path: {
                'username': username,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
