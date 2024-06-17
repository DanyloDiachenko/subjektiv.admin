import { INotificationUserInfo } from './notification.message.types';
import { INotificationRPCUserInfo } from './notification.types.rpc';

export function convertRPCUserInfoToWSMessageUserInfo(
    user: INotificationRPCUserInfo,
): INotificationUserInfo {
    return {
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar_href_path,
        username: user.username,
    };
}
