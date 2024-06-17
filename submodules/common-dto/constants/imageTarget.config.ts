import {
    ImageFormatEnum,
    ImageKindEnum,
    ImageRatioEnum,
    StorageService,
} from '../api-client/storage';
import { ImageKindConfig } from './imageKind.config';
import ImageTargetEnum from './imageTarget.enum';

const PUBLIC_STORAGE = process.env['NEXT_PUBLIC_HOST_URL'];
const PRIVATE_STORAGE = `${process.env['NEXT_PUBLIC_STORAGE_URL']}/storage/private`;

const GENERAL_PHOTOS_LOCATION = 'general';

type AdditionalUploadOptions = Omit<
    Parameters<StorageService['storageControllerUpload']>[0],
    'place' | 'kind' | 'formData'
>;

export interface IImageTargetConfiguration<K extends ImageKindEnum, TPost, TGet> {
    kind: K;
    getUploadData: (options: TPost) => {
        path: string;
        options?: AdditionalUploadOptions;
    };
    downloadPath: (
        options: TGet,
        imageId: string,
        size: (typeof ImageKindConfig)[K][number]['postfix'],
    ) => string;
}

export const imageTargetConfig = {
    [ImageTargetEnum.UserAvatar]: <
        IImageTargetConfiguration<ImageKindEnum.USER_AVATAR, null, null>
    >{
        kind: ImageKindEnum.USER_AVATAR,
        getUploadData: () => {
            return { path: `user/avatar` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/user/avatar/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Document]: <
        IImageTargetConfiguration<ImageKindEnum.DOCUMENT, null, { userId: string }>
    >{
        kind: ImageKindEnum.DOCUMENT,
        getUploadData: () => {
            return { path: `documents` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PRIVATE_STORAGE}?user_id=${options.userId}&place=documents/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Artwork]: <
        IImageTargetConfiguration<
            ImageKindEnum.ARTWORK_IMAGE,
            { artworkId: number; ratio: ImageRatioEnum },
            { artworkId: number }
        >
    >{
        kind: ImageKindEnum.ARTWORK_IMAGE,
        getUploadData: (options) => {
            return {
                path: `artwork/${options.artworkId}`,
                options: { ratio: options.ratio ?? ImageRatioEnum.RATIO_1_1 },
            };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/artwork/${options.artworkId}/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Category]: <IImageTargetConfiguration<ImageKindEnum.GENERAL, null, null>>{
        kind: ImageKindEnum.GENERAL,
        getUploadData: () => {
            return { path: `${GENERAL_PHOTOS_LOCATION}/category` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/${GENERAL_PHOTOS_LOCATION}/category/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Style]: <IImageTargetConfiguration<ImageKindEnum.GENERAL, null, null>>{
        kind: ImageKindEnum.GENERAL,
        getUploadData: () => {
            return { path: `${GENERAL_PHOTOS_LOCATION}/style}` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/${GENERAL_PHOTOS_LOCATION}/style}/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Subject]: <IImageTargetConfiguration<ImageKindEnum.GENERAL, null, null>>{
        kind: ImageKindEnum.GENERAL,
        getUploadData: () => {
            return { path: `${GENERAL_PHOTOS_LOCATION}/subject` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/${GENERAL_PHOTOS_LOCATION}/subject/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.Material]: <IImageTargetConfiguration<ImageKindEnum.GENERAL, null, null>>{
        kind: ImageKindEnum.GENERAL,
        getUploadData: () => {
            return { path: `${GENERAL_PHOTOS_LOCATION}/material` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/${GENERAL_PHOTOS_LOCATION}/material/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
    [ImageTargetEnum.CountryFlag]: <
        IImageTargetConfiguration<ImageKindEnum.COUNTRY_FLAG, null, null>
    >{
        kind: ImageKindEnum.COUNTRY_FLAG,
        getUploadData: () => {
            return { path: `${GENERAL_PHOTOS_LOCATION}/country-flag` };
        },
        downloadPath: (options, imageId, size) => {
            return `${PUBLIC_STORAGE}/${GENERAL_PHOTOS_LOCATION}/country-flag/${imageId}_${size}.${ImageFormatEnum.JPEG}`;
        },
    },
} as const;
