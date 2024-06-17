import apiClient from "@/api/apiClient";
import getImageDownloadPath from "@/submodules/common-dto/constants/getImageDownloadPath";
import {
    IImageTargetConfiguration,
    imageTargetConfig,
} from "@/submodules/common-dto/constants/imageTarget.config";

/*
	@example

	// Work with artwork images
	void imageService.upload(ImageTargetEnum.ArtworkImage, someFileBlob, {
		artworkId: 'artworkId_here',
	});

	imageService.getUrl(
		ImageTargetEnum.ArtworkImage,
		{ artworkId: 'artworkId_here', ratio: ImageRatioEnum.RATIO_1_1 },
		'some_image_id_here',
		'size_here',
	);

	// Work with users avatar
	void imageService.upload(ImageTargetEnum.UserAvatar, someFileBlob, null);

	imageService.getUrl(
		ImageTargetEnum.UserAvatar,
		null,
		'some_image_id_here',
		'small',
	);
 */

class ImageService {
    async upload<K extends keyof typeof imageTargetConfig>(
        type: K,
        file: Blob,
        ...options: Parameters<(typeof imageTargetConfig)[K]["getUploadData"]>
    ): Promise<string> {
        const target = imageTargetConfig[type];

        const targetTyped = target as IImageTargetConfiguration<
            (typeof target)["kind"],
            (typeof options)[0],
            null
        >;

        const uploadData = targetTyped.getUploadData(
            ...(options as Parameters<(typeof targetTyped)["getUploadData"]>),
        );

        const result = await apiClient.storage.storage.storageControllerUpload({
            kind: targetTyped.kind,
            place: uploadData.path,
            formData: {
                file,
            },
            ...uploadData.options,
        });

        return result.data.image_id;
    }

    getUrl<K extends keyof typeof imageTargetConfig>(
        type: K,
        ...options: Parameters<(typeof imageTargetConfig)[K]["downloadPath"]>
    ): string {
        return getImageDownloadPath(type, ...options);
    }
}

const imageService = new ImageService();

export default imageService;
