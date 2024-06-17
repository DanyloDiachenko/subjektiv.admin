/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { MainAdminNotificationGetIdResponseDto } from '../models/MainAdminNotificationGetIdResponseDto';
import type { MainAdminNotificationGetResponseDto } from '../models/MainAdminNotificationGetResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class AdminNotificationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of notifications. [ACCESS: Required access functions: main.adminNotification:get]
     * @returns MainAdminNotificationGetResponseDto List of notifications
     * @throws ApiError
     */
    public adminNotificationControllerGetList({
        page,
    }: {
        /**
         * Page number
         */
        page?: number,
    }): CancelablePromise<MainAdminNotificationGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/notification',
            query: {
                'page': page,
            },
        });
    }
    /**
     * Get notification by id. [ACCESS: Required access functions: main.adminNotification:get]
     * @returns MainAdminNotificationGetIdResponseDto Notification object
     * @throws ApiError
     */
    public adminNotificationControllerGetById({
        id,
    }: {
        id: number,
    }): CancelablePromise<MainAdminNotificationGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/admin/notification/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update notification by id. [ACCESS: Required access functions: main.adminNotification:update]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public adminNotificationControllerUpdate({
        id,
        isSolved,
    }: {
        /**
         * Notification id
         */
        id: number,
        /**
         * Is notification resolved
         */
        isSolved?: boolean,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/admin/notification/{id}',
            path: {
                'id': id,
            },
            query: {
                'is_solved': isSolved,
            },
        });
    }
}
