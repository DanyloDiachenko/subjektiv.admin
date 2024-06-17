import { ImageKindEnum, ImageRatioEnum } from '../api-client/storage';
import { ImageKindConfig } from './imageKind.config';

export type ImageSizeVariants<K extends ImageKindEnum> = {
    [key in (typeof ImageKindConfig)[K][number]['postfix']]?: string;
};

export type ImageDataType<K extends ImageKindEnum> = {
    image_id: string;
    ratio: ImageRatioEnum | null;
    sizes: ImageSizeVariants<K>;
};
