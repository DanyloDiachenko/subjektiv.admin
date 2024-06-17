import { IImageTargetConfiguration, imageTargetConfig } from './imageTarget.config';

export default function getImageUploadPlace<K extends keyof typeof imageTargetConfig>(
    type: K,
    ...options: Parameters<(typeof imageTargetConfig)[K]['getUploadData']>
): string {
    const target = imageTargetConfig[type];

    const targetTyped = target as IImageTargetConfiguration<
        (typeof target)['kind'],
        (typeof options)[0],
        null
    >;

    return targetTyped.getUploadData(
        ...(options as Parameters<(typeof targetTyped)['getUploadData']>),
    ).path;
}
