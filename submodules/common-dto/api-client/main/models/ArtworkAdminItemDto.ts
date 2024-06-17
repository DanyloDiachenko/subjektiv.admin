/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { CategoryItemDto } from './CategoryItemDto';
import type { ImagePreviewDto } from './ImagePreviewDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type ArtworkAdminItemDto = {
    /**
     * Id of artwork
     */
    id: number;
    /**
     * Localized title of artwork
     */
    title: string | null;
    /**
     * Price of artwork
     */
    price: number;
    /**
     * Front image of artwork
     */
    main_image: ImagePreviewDto | null;
    /**
     * Dominant HSB color
     */
    dominant_hsb_color: Array<number>;
    status: ArtWorkStatus;
    /**
     * Artwork author
     */
    author: UserPreviewDto;
    /**
     * Artwork owner
     */
    owner: UserPreviewDto;
    /**
     * Artwork cour owner
     */
    cour_owner: UserPreviewDto | null;
    /**
     * Specifies if the artwork is owned by author, or some another owner.
     */
    is_owned_by_author: boolean;
    /**
     * Specifies if the artwork is published. Unpublished artworks are visible only for author/owner or admin
     */
    is_published: boolean | null;
    /**
     * Id of author
     */
    author_id: string;
    /**
     * Year of artwork
     */
    year: number;
    /**
     * Category
     */
    category: CategoryItemDto | null;
    /**
     * Updated at
     */
    updated_at: string;
    /**
     * Is moderated
     */
    is_moderated: boolean;
    /**
     * Moderated at
     */
    moderated_at: string | null;
    /**
     * Is public
     */
    is_public: boolean;
    /**
     * Created at
     */
    created_at: string;
};

