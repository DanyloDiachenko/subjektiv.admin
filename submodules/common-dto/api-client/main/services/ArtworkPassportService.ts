/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_MainArtworkPassportPostResponseDto } from '../models/ApiResponse_MainArtworkPassportPostResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkPassportService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get artwork-passport. For artist only
     * @returns ApiResponse_MainArtworkPassportPostResponseDto Artwork
     * @throws ApiError
     */
    public artworkPassportControllerCreateArtworkPassport({
        id,
        contentLanguage,
    }: {
        /**
         * Artwork identifier
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_MainArtworkPassportPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/passport/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
}
