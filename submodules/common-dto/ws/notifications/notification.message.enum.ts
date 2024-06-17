// import {NotificationMessageEnum as DtoEnum} from "../../api-client/notification";

export enum NotificationMessageEnum {
    documentsVerifyUpdate = 'documentsVerifyUpdate',

    newFollower = 'newFollower',

    receivedArtworkPostComment = 'receivedArtworkPostComment',
    receivedArtworkPostCommentReply = 'receivedArtworkPostCommentReply',
    receivedArtworkPostCommentReaction = 'receivedArtworkPostCommentReaction',

    receivedArtworkOffer = 'receivedArtworkOffer',
    receivedArtworkBid = 'receivedArtworkBid',

    artworkReviewRequestForArtist = 'artworkReviewRequestForArtist',
    artworkReviewRequestForExpert = 'artworkReviewRequestForExpert',
    artworkReviewPublishedForArtist = 'artworkReviewPublishedForArtist',

    artworkOrderStatusUpdate = 'artworkOrderStatusUpdate',
}
