import { ImageRatioEnum } from '../../api-client/storage';
import { ISize } from './iSize';
import { sizeApplyRatio } from './sizeApplyRatio';
import sizeClamp from './sizeClamp';
import sizeFitTo from './sizeFitTo';

const MAX_IMAGE_RESOLUTION: ISize = {
    width: 1920,
    height: 1080,
};

export function resizeImage(
    originalSize: ISize,
    ratio: ImageRatioEnum | null,
    fitSize: ISize | null,
): ISize {
    const dimensions = ratio
        ? sizeApplyRatio({ width: 1, height: 1 }, ratio)
        : { width: 1, height: originalSize.height / originalSize.width };

    const targetFit = fitSize ?? originalSize;

    const fittedDimensions = sizeFitTo(dimensions, targetFit);

    const clampedMax = sizeClamp(fittedDimensions, MAX_IMAGE_RESOLUTION);

    return {
        width: Math.floor(clampedMax.width),
        height: Math.floor(clampedMax.height),
    };
}
