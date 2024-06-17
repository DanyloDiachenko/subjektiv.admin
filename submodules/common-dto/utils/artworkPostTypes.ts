import {
    ArtworkPostType,
    type ImagePreviewDto,
    ProfileTypeEnum,
    UserPreviewDto,
} from '../api-client/main';

interface IArtworkReview {
    id: number;
    reviewer: Omit<UserPreviewDto, 'profile_type'> & { profile_type: ProfileTypeEnum };

    title: string | null;
    description: string | null;

    edit_till_date: Date | null;
}

interface IEventPreview {
    id: number;
    title: string;
    location: string | null;
    date_from: Date | null;
    date_to: Date | null;
    url: string | null;
    artwork_ids: number[];
    created_at: Date;
}

export type TPostPreview = {
    id: number;
    post_type: ArtworkPostType;
    artwork_id: number;
    main_image: ImagePreviewDto | null;
};

export type TOrderPreview = {
    price: number;
};

export interface IValueChange {
    previous_value: number;
    new_value: number;
}

export type ArtworkPostDataTypeMap = {
    [ArtworkPostType.CREATED]: null;
    [ArtworkPostType.GROUP]: {
        posts: TPostPreview[];
    };
    [ArtworkPostType.PROGRESS]: null;
    [ArtworkPostType.UPDATE]: null;
    [ArtworkPostType.FINISHED]: null;
    [ArtworkPostType.AVAILABLE]: {
        price: number;
    };
    [ArtworkPostType.COUR_BUY]: null | {
        order: TOrderPreview;
    };
    [ArtworkPostType.BUY]: null | {
        order: TOrderPreview;
    };
    [ArtworkPostType.PRICE]: {
        history: ({ date: Date } & IValueChange)[];
    } & IValueChange;
    [ArtworkPostType.REVIEW]: {
        review: IArtworkReview;
    };
    [ArtworkPostType.PROMO]: null;
    [ArtworkPostType.EVENT]: {
        event: IEventPreview;
    };
    [ArtworkPostType.DESCRIPTION]: null;
};
