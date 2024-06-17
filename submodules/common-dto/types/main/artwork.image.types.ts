import { ArtWorkImageRatio } from '../../api-client/main';

export interface IArtworkMainImagePreview {
    image_id: string;
    format: string;
    ratio: ArtWorkImageRatio;
}
