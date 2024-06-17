import { AttachmentType } from '../api-client/main';
import { ImageKindEnum, ImageRatioEnum, VideoPresetEnum } from '../api-client/storage';
import { ImageDataType, ImageSizeVariants } from './imageData.types';

// Pending upload
export type PendingUploadDataType = {
    file_id: string;
    is_uploaded: boolean;
};

export function isDataPendingUpload(argument: unknown): argument is PendingUploadDataType {
    if (typeof argument !== 'object' || argument === null) {
        return false;
    }

    const fileIdLiteral = 'file_id' satisfies keyof PendingUploadDataType;
    const isUploadedLiteral = 'is_uploaded' satisfies keyof PendingUploadDataType;

    if (!(fileIdLiteral in argument) || !(isUploadedLiteral in argument)) {
        return false;
    }

    return (
        typeof argument[fileIdLiteral] === 'string' &&
        typeof argument[isUploadedLiteral] === 'boolean'
    );
}

type AttachmentDataWithPendingUploadConverter<T extends AttachmentData> = T & {
    additional_data: T['additional_data'] & PendingUploadDataType;
};

export type AttachmentDataWithPendingUpload =
    AttachmentDataWithPendingUploadConverter<AttachmentData>;

export function isAttachmentContainsPendingUpload(
    argument: AttachmentData,
): argument is AttachmentDataWithPendingUpload {
    return isDataPendingUpload(argument.additional_data);
}

// Attachments

export interface IAttachmentDataBase {
    id: number;
    created_at: Date;
}

export interface IVideoVariant {
    path: string;
    mime_type: string;
    preset: VideoPresetEnum;
    width: number;
    height: number;
}

export type AttachmentDataTypeMap = {
    [AttachmentType.IMAGE]: ImageDataType<ImageKindEnum.ARTWORK_IMAGE>;
    [AttachmentType.VIDEO]: PendingUploadDataType & {
        ratio: ImageRatioEnum;
        thumbnails: ImageSizeVariants<ImageKindEnum.VIDEO_THUMBNAIL>;
        duration: number;
        variants: IVideoVariant[];
    };
};

// Internal

export interface IAttachmentDataTyped<K extends AttachmentType> {
    type: K;
    additional_data: AttachmentDataTypeMap[K];
}

type AttachmentDataGeneric<KeyT extends AttachmentType> = {
    [Key in KeyT]: IAttachmentDataTyped<Key>;
}[KeyT];

export type AttachmentData = AttachmentDataGeneric<AttachmentType>;

// Public

export interface IAttachmentPublicDataTyped<K extends AttachmentType> extends IAttachmentDataBase {
    type: K;
    additional_data: AttachmentDataTypeMap[K];
}

type AttachmentPublicDataGeneric<KeyT extends AttachmentType> = {
    [Key in KeyT]: IAttachmentPublicDataTyped<Key>;
}[KeyT];

export type AttachmentPublicData = AttachmentPublicDataGeneric<AttachmentType>;

// User input

export type CreatedAttachmentDataType = IAttachmentDataTyped<AttachmentType> & {
    id: number;
    created_at: Date;
};

export type InputAttachmentData = IAttachmentDataTyped<AttachmentType> | CreatedAttachmentDataType;
