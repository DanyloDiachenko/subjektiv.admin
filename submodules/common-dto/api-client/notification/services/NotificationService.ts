/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationNotificationGetResponseDto } from '../models/NotificationNotificationGetResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class NotificationService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get list of users notifications.
     * @returns NotificationNotificationGetResponseDto List of artwork reviews
     * @throws ApiError
     */
    public notificationControllerGet({
        page,
    }: {
        /**
         * The page number for pagination
         */
        page?: number,
    }): CancelablePromise<NotificationNotificationGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/notification',
            query: {
                'page': page,
            },
        });
    }
}
