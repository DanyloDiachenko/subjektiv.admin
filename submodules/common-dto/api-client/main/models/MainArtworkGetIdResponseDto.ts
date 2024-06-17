/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
import type { ArtworkImageDto } from './ArtworkImageDto';
import type { ArtworkOrderItemDto } from './ArtworkOrderItemDto';
import type { ArtWorkStatus } from './ArtWorkStatus';
import type { CategoryFullDto } from './CategoryFullDto';
import type { KeywordDto } from './KeywordDto';
import type { MainArtworkReviewPreviewDto } from './MainArtworkReviewPreviewDto';
import type { MainArtworkReviewRequestPreviewDto } from './MainArtworkReviewRequestPreviewDto';
import type { MaterialDto } from './MaterialDto';
import type { PackagingType } from './PackagingType';
import type { StyleDto } from './StyleDto';
import type { SubjectDto } from './SubjectDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainArtworkGetIdResponseDto = {
    /**
     * Id of artwork
     */
    id: number;
    /**
     * Key words
     */
    key_words: Array<KeywordDto>;
    /**
     * Images of artwork
     */
    artwork_images: Array<ArtworkImageDto>;
    /**
     * Category
     */
    category: CategoryFullDto | null;
    /**
     * Materials
     */
    materials: Array<MaterialDto>;
    /**
     * Style
     */
    style: StyleDto | null;
    /**
     * Subject
     */
    subject: SubjectDto | null;
    /**
     * Owner
     */
    owner: UserPreviewDto;
    /**
     * Author
     */
    author: UserPreviewDto;
    /**
     * Cuor owner
     */
    cuor_owner: UserPreviewDto | null;
    /**
     * Is artwork owned by author
     */
    is_owned_by_author: boolean;
    /**
     * Localized title of artwork
     */
    title: string | null;
    /**
     * Description of artwork
     */
    description: string | null;
    /**
     * Price of artwork
     */
    price: number;
    /**
     * Front image
     */
    main_image: ArtworkImageDto | null;
    /**
     * Dominant HSB color of artwork
     */
    dominant_hsb_color: Array<number>;
    /**
     * Is artwork active
     */
    is_active: boolean;
    /**
     * Is artwork published
     */
    is_published: boolean | null;
    /**
     * Private address accessible by owner only (not author!)
     */
    address?: AddressDto | null;
    /**
     * Is artwork will be packed for selling by owner. Seen only by owner.
     */
    is_packed_by_me: boolean | null;
    /**
     * Is artwork mounted. Seen only by owner.
     */
    is_mounted: boolean;
    /**
     * Height of artwork
     */
    height: number;
    /**
     * Width of artwork
     */
    width: number;
    /**
     * Length of artwork
     */
    length: number;
    /**
     * Depth of artwork
     */
    depth: number;
    /**
     * Weight of artwork
     */
    weight: number;
    /**
     * Is artwork factual weight
     */
    is_factual_weight: boolean | null;
    /**
     * Volumetric weight of artwork
     */
    volumetric_weight: number;
    /**
     * Year of artwork
     */
    year: number;
    status: ArtWorkStatus;
    /**
     * Created at of artwork
     */
    created_at: string;
    /**
     * Users saved collections contains this artwork
     */
    saved_in_collections: Array<number>;
    /**
     * Array of orders
     */
    order: ArtworkOrderItemDto | null;
    /**
     * Is there are finished users orders related to this artwork
     */
    is_my_orders: boolean;
    /**
     * Is artwork good enough to be in feed
     */
    is_public?: boolean;
    /**
     * Review of artwork
     */
    review: MainArtworkReviewPreviewDto | null;
    /**
     * Is review writing in progress
     */
    is_review_writing_in_progress: boolean | null;
    /**
     * Active pending review request
     */
    pending_expert: MainArtworkReviewRequestPreviewDto | null;
    /**
     * The ID of the certificate file
     */
    certificate_file_path: string | null;
    packaging_types: Array<PackagingType>;
    /**
     * Is artwork marked as missing details is completed
     */
    is_missing_details_completed: boolean | null;
    /**
     * Interested experts list
     */
    interested_experts: Array<UserPreviewDto>;
    /**
     * Count of interested experts
     */
    interested_experts_count: number;
    /**
     * Is user already interested expert
     */
    i_already_interested_expert: boolean;
};

