/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminNotificationType } from './AdminNotificationType';
export type MainAdminNotificationGetIdResponseDto = {
    /**
     * ID of notification
     */
    id: number;
    /**
     * Title of notification
     */
    title: string;
    /**
     * Description of notification
     */
    text: string;
    type: AdminNotificationType;
    /**
     * Is notification read
     */
    is_read: boolean;
    /**
     * Is notification solved
     */
    is_solved: boolean;
    /**
     * ID of user
     */
    user_id: string;
    /**
     * Date of creation
     */
    created_at: string;
};

