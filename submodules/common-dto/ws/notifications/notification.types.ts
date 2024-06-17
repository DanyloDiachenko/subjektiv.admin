import { NotificationMessageEnum } from './notification.message.enum';
import { WSNotificationMessageTypeMap } from './notification.message.types';

export interface IWSNotificationMessage<K extends NotificationMessageEnum> {
    type: K;
    additional_data: WSNotificationMessageTypeMap[K];

    user_id: string;
    title: string;
    description: string;
    image: string | null;
    deep_link: string | undefined;

    created_at: Date;
}

type WSNotificationMessageDataGeneric<KeyT extends NotificationMessageEnum> = {
    [Key in KeyT]: IWSNotificationMessage<Key>;
}[KeyT];

export type WSNotificationMessage = WSNotificationMessageDataGeneric<NotificationMessageEnum>;
