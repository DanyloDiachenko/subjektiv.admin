import { ISize } from './iSize';

export default function sizeClamp(source: ISize, maxBoundary: ISize): ISize {
    if (source.width < maxBoundary.width && source.height < maxBoundary.height) {
        return { ...source };
    }

    const scalar = Math.min(maxBoundary.width / source.width, maxBoundary.height / source.height);

    return {
        width: source.width * scalar,
        height: source.height * scalar,
    };
}
