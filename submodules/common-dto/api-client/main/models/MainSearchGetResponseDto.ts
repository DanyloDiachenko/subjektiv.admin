/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ArtworkSuggestionDto } from './ArtworkSuggestionDto';
import type { UserPreviewDto } from './UserPreviewDto';
export type MainSearchGetResponseDto = {
    /**
     * Array of artworks suggestions
     */
    artworks: Array<ArtworkSuggestionDto>;
    /**
     * Array of artists suggestions
     */
    artists: Array<UserPreviewDto>;
};

