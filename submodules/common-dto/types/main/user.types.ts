// User preview
import { ArtWorkStatus, ProfileTypeEnum } from '../../api-client/main';
import { IArtworkMainImagePreview } from './artwork.image.types';

export interface IUserPreview {
    id: string;
    chat_id: string;
    username: string;
    first_name: string | null;
    last_name: string | null;
    avatar_id: string | null;
    position: string | null;
    email: string;
    profile_type: ProfileTypeEnum;
}

export interface IUserPreviewWithIsFollowing extends IUserPreview {
    is_following: boolean;
}

export interface IArtworkPreview {
    id: number;
    title: string | null;
    main_image: IArtworkMainImagePreview | null;
    dominant_hsb_color: number[];
    status: ArtWorkStatus;
}

export interface IArtworkPreviewWithAuthor extends IArtworkPreview {
    author: IUserPreview;
}
