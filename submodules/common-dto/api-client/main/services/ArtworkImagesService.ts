/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainArtworkImagePostResponseDto } from '../models/ApiResponse_MainArtworkImagePostResponseDto';
import type { MainArtworkImageGetResponseDto } from '../models/MainArtworkImageGetResponseDto';
import type { MainArtworkImagePostRequestDto } from '../models/MainArtworkImagePostRequestDto';
import type { MainArtworkImagePutRequestDto } from '../models/MainArtworkImagePutRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class ArtworkImagesService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Create artwork image. If not owner of artwork: [ACCESS: Required access functions: main.artworkImage:create]
     * @returns ApiResponse_MainArtworkImagePostResponseDto
     * @throws ApiError
     */
    public artworkImageControllerCreate({
        requestBody,
    }: {
        requestBody: MainArtworkImagePostRequestDto,
    }): CancelablePromise<ApiResponse_MainArtworkImagePostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/artwork/images',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get list of artwork images.
     * @returns MainArtworkImageGetResponseDto
     * @throws ApiError
     */
    public artworkImageControllerGetAll({
        page,
        artworkId,
    }: {
        /**
         * Page number
         */
        page?: number,
        /**
         * Artwork identifier
         */
        artworkId?: number,
    }): CancelablePromise<MainArtworkImageGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/artwork/images',
            query: {
                'page': page,
                'artwork_id': artworkId,
            },
        });
    }
    /**
     * Update artwork image. If not owner of artwork: [ACCESS: Required access functions: main.artworkImage:update]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkImageControllerUpdate({
        id,
        requestBody,
    }: {
        /**
         * Artwork image identifier
         */
        id: number,
        requestBody: MainArtworkImagePutRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/artwork/images/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete artwork image. If not owner of artwork: [ACCESS: Required access functions: main.artworkImage:delete]
     * @returns ApiResponse_ApiOkResponseDto
     * @throws ApiError
     */
    public artworkImageControllerDelete({
        id,
    }: {
        /**
         * Artwork image identifier
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/artwork/images/{id}',
            path: {
                'id': id,
            },
        });
    }
}
