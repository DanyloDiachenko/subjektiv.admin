import { NotificationMessageEnum } from './notification.message.enum';

export const NotificationSettings = {
    [NotificationMessageEnum.documentsVerifyUpdate]: {
        is_notification: true,
        is_email: true,
    },

    [NotificationMessageEnum.newFollower]: {
        is_notification: true,
        is_email: false,
    },

    [NotificationMessageEnum.receivedArtworkPostComment]: {
        is_notification: true,
        is_email: false,
    },
    [NotificationMessageEnum.receivedArtworkPostCommentReply]: {
        is_notification: true,
        is_email: false,
    },
    [NotificationMessageEnum.receivedArtworkPostCommentReaction]: {
        is_notification: true,
        is_email: false,
    },

    [NotificationMessageEnum.receivedArtworkOffer]: {
        is_notification: false,
        is_email: false,
    },
    [NotificationMessageEnum.receivedArtworkBid]: {
        is_notification: false,
        is_email: false,
    },

    [NotificationMessageEnum.artworkReviewRequestForArtist]: {
        is_notification: true,
        is_email: false,
    },
    [NotificationMessageEnum.artworkReviewRequestForExpert]: {
        is_notification: true,
        is_email: false,
    },
    [NotificationMessageEnum.artworkReviewPublishedForArtist]: {
        is_notification: true,
        is_email: false,
    },

    [NotificationMessageEnum.artworkOrderStatusUpdate]: {
        is_notification: false,
        is_email: true,
    },
} as const satisfies {
    [Key in NotificationMessageEnum]: {
        is_notification: boolean;
        is_email: boolean;
    };
};
