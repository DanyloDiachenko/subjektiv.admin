/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NotificationMessageEnum } from './NotificationMessageEnum';
export type NotificationItemDto = {
    type: NotificationMessageEnum;
    /**
     * Additional data for notification
     */
    additional_data: Record<string, any>;
    /**
     * Title of notification
     */
    title: string;
    /**
     * Description of notification
     */
    description: string;
    /**
     * Date of notification
     */
    image: string | null;
    /**
     * Is notification read
     */
    is_read: boolean;
    /**
     * Deep link
     */
    deep_link?: string;
    /**
     * Date of notification
     */
    created_at: string;
};

