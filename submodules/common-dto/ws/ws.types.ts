import { WSNotificationMessage } from './notifications/notification.types';

export const enum WSMessageEnum {
    NOTIFICATION = 'NOTIFICATION',
    AUTH = 'AUTH',
    GREETINGS = 'GREETINGS',
    NOTIFICATIONS_READ = 'NOTIFICATIONS_READ',
    CHANNELS_LISTEN = 'CHANNELS_LISTEN',
}

export type WSMessageTypeMap = {
    [WSMessageEnum.NOTIFICATION]: WSNotificationMessage;
    [WSMessageEnum.AUTH]: string | undefined;
    [WSMessageEnum.GREETINGS]: {
        unread_notifications_count: number;
    };
    [WSMessageEnum.NOTIFICATIONS_READ]: undefined;
    [WSMessageEnum.CHANNELS_LISTEN]: {
        on: string[];
        off: string[];
    };
};

export interface IWSMessage<K extends WSMessageEnum> {
    type: K;
    data: WSMessageTypeMap[K];
}

type WSMessageGeneric<KeyT extends WSMessageEnum> = {
    [Key in KeyT]: IWSMessage<Key>;
}[KeyT];

export type WSMessage = WSMessageGeneric<WSMessageEnum>;

export function isWSMessage<K extends WSMessageEnum>(
    type: K,
    value: unknown,
): value is IWSMessage<K> {
    if (typeof value !== 'object' || value === null) {
        return false;
    }

    return (
        ('type' satisfies keyof WSMessage) in value &&
        ('data' satisfies keyof WSMessage) in value &&
        value.type === type
    );
}

export type WSMessageCallbackGeneric<KeyT extends WSMessageEnum> = {
    [Key in KeyT]: (data: WSMessageTypeMap[Key]) => void;
}[KeyT];

export type WSMessageCallback = WSMessageCallbackGeneric<WSMessageEnum>;

export interface IWSExceptionResponse {
    success: false;
    statusCode: number;
    message: string;
    data: Record<string, string>;
}
