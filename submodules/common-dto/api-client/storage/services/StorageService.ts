/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_StorageStoragePostUploadAnyResponseDto } from '../models/ApiResponse_StorageStoragePostUploadAnyResponseDto';
import type { ApiResponse_StorageStoragePostUploadPdfResponseDto } from '../models/ApiResponse_StorageStoragePostUploadPdfResponseDto';
import type { ApiResponse_StorageStoragePostUploadResponseDto } from '../models/ApiResponse_StorageStoragePostUploadResponseDto';
import type { ApiResponse_StorageStoragePostUploadVideoResponseDto } from '../models/ApiResponse_StorageStoragePostUploadVideoResponseDto';
import type { ImageFormatEnum } from '../models/ImageFormatEnum';
import type { ImageKindEnum } from '../models/ImageKindEnum';
import type { ImageRatioEnum } from '../models/ImageRatioEnum';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class StorageService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Upload an image to the storage
     * @returns ApiResponse_StorageStoragePostUploadResponseDto Image info
     * @throws ApiError
     */
    public storageControllerUpload({
        place,
        kind,
        formData,
        ratio,
        format,
        contentLanguage,
    }: {
        /**
         * The destination path of file location.
         */
        place: string,
        /**
         * Kind of image
         */
        kind: ImageKindEnum,
        formData: {
            file?: Blob;
        },
        /**
         * Target image ratio
         */
        ratio?: ImageRatioEnum,
        /**
         * Target image format
         */
        format?: ImageFormatEnum,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_StorageStoragePostUploadResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/storage/upload',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'place': place,
                'kind': kind,
                'ratio': ratio,
                'format': format,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Upload an pdf file to the storage
     * @returns ApiResponse_StorageStoragePostUploadPdfResponseDto PDF file info
     * @throws ApiError
     */
    public storageControllerUploadPdf({
        place,
        formData,
        contentLanguage,
    }: {
        /**
         * Path of the file location
         */
        place: string,
        formData: {
            file?: Blob;
        },
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_StorageStoragePostUploadPdfResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/storage/upload-pdf',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'place': place,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Download private file
     * @returns binary
     * @throws ApiError
     */
    public storageControllerGetPrivate({
        path,
        contentLanguage,
    }: {
        /**
         * Path of the file location
         */
        path: string,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/storage/private',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'path': path,
            },
        });
    }
    /**
     * Upload an video to the storage
     * @returns ApiResponse_StorageStoragePostUploadVideoResponseDto Uploaded video info
     * @throws ApiError
     */
    public storageControllerUploadVideo({
        place,
        formData,
        contentLanguage,
    }: {
        /**
         * The destination path of file location.
         */
        place: string,
        formData: {
            file?: Blob;
        },
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_StorageStoragePostUploadVideoResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/storage/upload-video',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'place': place,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Upload an any file to the storage
     * @returns ApiResponse_StorageStoragePostUploadAnyResponseDto Uploaded file info
     * @throws ApiError
     */
    public storageControllerUploadAny({
        place,
        formData,
        contentLanguage,
    }: {
        /**
         * The destination path of file location.
         */
        place: string,
        formData: {
            file?: Blob;
        },
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<ApiResponse_StorageStoragePostUploadAnyResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/storage/upload-any',
            headers: {
                'Content-Language': contentLanguage,
            },
            query: {
                'place': place,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
