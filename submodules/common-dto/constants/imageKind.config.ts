import { ImageKindEnum } from '../api-client/storage';

export const ImageKindConfig = {
    [ImageKindEnum.DOCUMENT]: [
        {
            postfix: 'full',
            options: null,
        },
    ],
    [ImageKindEnum.USER_AVATAR]: [
        {
            postfix: 'medium',
            options: {
                width: 150,
                height: 150,
            },
        },
        {
            postfix: 'small',
            options: {
                width: 50,
                height: 50,
            },
        },
    ],
    [ImageKindEnum.ARTWORK_IMAGE]: [
        {
            postfix: 'full',
            options: null,
        },
        {
            postfix: 'medium',
            options: {
                width: 600,
                height: 600,
            },
        },
        {
            postfix: 'small',
            options: {
                width: 300,
                height: 300,
            },
        },
    ],
    [ImageKindEnum.GENERAL]: [
        {
            postfix: 'medium',
            options: {
                width: 500,
                height: 500,
            },
        },
        {
            postfix: 'small',
            options: {
                width: 100,
                height: 100,
            },
        },
    ],
    [ImageKindEnum.COUNTRY_FLAG]: [
        {
            postfix: 'medium',
            options: {
                width: 200,
                height: 150,
            },
        },
        {
            postfix: 'small',
            options: {
                width: 50,
                height: 40,
            },
        },
    ],
    [ImageKindEnum.VIDEO_THUMBNAIL]: [
        {
            postfix: 'small',
            options: {
                width: 192,
                height: 144,
            },
        },
        {
            postfix: 'medium',
            options: {
                width: 720,
                height: 480,
            },
        },
    ],
} as const;
