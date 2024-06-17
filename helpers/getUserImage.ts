import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

export const getUserImage = (userAvatarId: string | null): string => {
    console.log(userAvatarId);
    if (!userAvatarId) {
        return "/media/no-avatar.png";
    }

    return imageService.getUrl(
        ImageTargetEnum.UserAvatar,
        null,
        userAvatarId,
        "small",
    );
};
