import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

export const getArtworkImage = (
    artworkId: number,
    imageId: string | undefined | null,
): string => {
    if (!imageId) {
        return "/media/no-avatar.png";
    }

    return imageService.getUrl(
        ImageTargetEnum.Artwork,
        {
            artworkId: artworkId,
        },
        imageId,
        "small",
    );
};
