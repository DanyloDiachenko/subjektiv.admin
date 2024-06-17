import {
    AdminUserItemDto,
    MainAdminUserGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";

export const returnUserRole = (
    user: AdminUserItemDto | MainAdminUserGetIdResponseDto,
) => {
    if (user.is_artist) {
        return "Artist";
    }
    if (user.is_expert) {
        return "Expert";
    }
    if (user.is_featured_artist) {
        return "Featured Artist";
    }

    return "Follower";
};
