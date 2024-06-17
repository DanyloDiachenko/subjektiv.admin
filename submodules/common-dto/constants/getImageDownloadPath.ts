import { IImageTargetConfiguration, imageTargetConfig } from './imageTarget.config';

export default function getImageDownloadPath<K extends keyof typeof imageTargetConfig>(
    type: K,
    ...options: Parameters<(typeof imageTargetConfig)[K]['downloadPath']>
): string {
    const target = imageTargetConfig[type];

    const targetTyped = target as IImageTargetConfiguration<
        (typeof target)['kind'],
        null,
        (typeof options)[0]
    >;

    return targetTyped.downloadPath(
        ...(options as Parameters<(typeof targetTyped)['downloadPath']>),
    );
}
