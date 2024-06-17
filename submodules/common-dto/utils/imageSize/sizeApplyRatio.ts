import { ImageRatioEnum } from '../../api-client/storage';
import { ISize } from './iSize';

export function sizeApplyRatio(size: ISize, ratio: ImageRatioEnum): ISize {
    const { width, height } = size;

    switch (ratio) {
        case ImageRatioEnum.RATIO_3_4: {
            return { width, height: (4 / 3) * width };
        }
        case ImageRatioEnum.RATIO_4_3: {
            return { width, height: (3 / 4) * width };
        }
        case ImageRatioEnum.RATIO_1_1: {
            return { width, height: width };
        }
        case ImageRatioEnum.RATIO_16_9: {
            return { width, height: (9 / 16) * width };
        }
        case ImageRatioEnum.RATIO_9_16: {
            return { width, height: (16 / 9) * width };
        }
        case ImageRatioEnum.RATIO_3_2: {
            return { width, height: (2 / 3) * width };
        }
        case ImageRatioEnum.RATIO_2_3: {
            return { width, height: (3 / 2) * width };
        }
        default: {
            return { width, height };
        }
    }
}
