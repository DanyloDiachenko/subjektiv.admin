import { ArtworkPostReaction } from '../../api-client/main';
import { IArtworkOrder } from '../../types/main/artwork.order.types';
import { NotificationMessageEnum } from './notification.message.enum';

export interface INotificationUserInfo {
    username: string;
    avatar: string | null;
    first_name: string | null;
    last_name: string | null;
}

export interface INotificationArtworkInfo {
    id: number;
    title: string;
    description: string | null;
    main_image: string | null;
}

export interface INotificationArtworkPostInfo {
    id: number;
    text: string;
}

export interface INotificationArtworkPostCommentInfo {
    id: number;
    text: string;
}

export enum ArtworkOrderStatusReceiverEnum {
    buyer = 'buyer',
    seller = 'seller',
    admin = 'admin',
    delivery_manager = 'delivery_manager',
}

export type WSNotificationMessageTypeMap = {
    [NotificationMessageEnum.documentsVerifyUpdate]: null;

    [NotificationMessageEnum.newFollower]: {
        user: INotificationUserInfo;
        is_following: boolean;
    };

    [NotificationMessageEnum.receivedArtworkPostComment]: {
        user: INotificationUserInfo;
        artwork_post: INotificationArtworkPostInfo;
        comment: INotificationArtworkPostCommentInfo;
        secondary_image: string | null;
    };
    [NotificationMessageEnum.receivedArtworkPostCommentReply]: {
        user: INotificationUserInfo;
        artwork_post: INotificationArtworkPostInfo;
        comment: INotificationArtworkPostCommentInfo;
        secondary_image: string | null;
    };
    [NotificationMessageEnum.receivedArtworkPostCommentReaction]: {
        user: INotificationUserInfo;
        artwork_post: INotificationArtworkPostInfo;
        comment: INotificationArtworkPostCommentInfo;
        secondary_image: string | null;
        reaction: ArtworkPostReaction;
    };

    [NotificationMessageEnum.receivedArtworkOffer]: null;
    [NotificationMessageEnum.receivedArtworkBid]: null;

    [NotificationMessageEnum.artworkReviewRequestForArtist]: {
        user: INotificationUserInfo;
        artwork: INotificationArtworkInfo;
    };
    [NotificationMessageEnum.artworkReviewRequestForExpert]: {
        user: INotificationUserInfo;
        artwork: INotificationArtworkInfo;
    };
    [NotificationMessageEnum.artworkReviewPublishedForArtist]: {
        user: INotificationUserInfo;
        artwork: INotificationArtworkInfo;
    };

    [NotificationMessageEnum.artworkOrderStatusUpdate]: {
        user: INotificationUserInfo;
        order: IArtworkOrder;
        receiver_type: ArtworkOrderStatusReceiverEnum;
    };
};
