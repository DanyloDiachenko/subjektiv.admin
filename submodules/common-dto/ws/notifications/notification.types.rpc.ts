import { ArtworkOrderStatus, UserVerificationStatus } from '../../api-client/main';
import LocaleEnum from '../../constants/locale.enum';
import { NotificationMessageEnum } from './notification.message.enum';
import { WSNotificationMessageTypeMap } from './notification.message.types';

// Issuer user, who triggered notification
export interface INotificationRPCUserInfo {
    uid: string;
    username: string;
    avatar_href_full: string | null;
    avatar_href_path: string | null;
    first_name: string | null;
    last_name: string | null;
}

// Internal RPC message types
export type WSRPCNotificationMessageTypeMap = {
    [NotificationMessageEnum.documentsVerifyUpdate]: {
        status: UserVerificationStatus;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.documentsVerifyUpdate];
    };

    [NotificationMessageEnum.newFollower]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.newFollower];
    };

    [NotificationMessageEnum.receivedArtworkPostComment]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.receivedArtworkPostComment];
    };
    [NotificationMessageEnum.receivedArtworkPostCommentReply]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.receivedArtworkPostCommentReply];
    };
    [NotificationMessageEnum.receivedArtworkPostCommentReaction]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.receivedArtworkPostCommentReaction];
    };

    [NotificationMessageEnum.receivedArtworkOffer]: {
        artwork_id: string;
        artwork_title: string;

        offer_id: string;
        offer_price: number;
        offer_title: string;
        offer_description: string;

        issuer: INotificationRPCUserInfo;

        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.receivedArtworkOffer];
    };
    [NotificationMessageEnum.receivedArtworkBid]: {
        artwork_id: string;
        artwork_title: string;

        bid_id: string;
        bid_price: number;
        bid_title: string;
        bid_description: string;

        issuer: INotificationRPCUserInfo;

        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.receivedArtworkBid];
    };

    [NotificationMessageEnum.artworkReviewRequestForArtist]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.artworkReviewRequestForArtist];
    };
    [NotificationMessageEnum.artworkReviewRequestForExpert]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.artworkReviewRequestForExpert];
    };
    [NotificationMessageEnum.artworkReviewPublishedForArtist]: {
        issuer: INotificationRPCUserInfo;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.artworkReviewPublishedForArtist];
    };

    [NotificationMessageEnum.artworkOrderStatusUpdate]: {
        status: ArtworkOrderStatus;
        additional_data: WSNotificationMessageTypeMap[NotificationMessageEnum.artworkOrderStatusUpdate];
    };
};

// Target user info, which will receive notification
export interface INotificationTarget {
    uid: string;
    username: string;
    email: string;
    first_name: string | null;
    last_name: string | null;
    locale: LocaleEnum;
}

export interface IWSRPCNotificationMessage<K extends NotificationMessageEnum> {
    target: INotificationTarget;
    type: K;
    data: WSRPCNotificationMessageTypeMap[K];
    created_at: Date;
}

export type WSRPCNotificationMessageGeneric<KeyT extends NotificationMessageEnum> = {
    [Key in KeyT]: IWSRPCNotificationMessage<Key>;
}[KeyT];

export type WSRPCNotificationMessage = WSRPCNotificationMessageGeneric<NotificationMessageEnum>;

export type ConvertToIWSRPCNotificationMessage<T extends WSRPCNotificationMessage> =
    IWSRPCNotificationMessage<T['type']>;
