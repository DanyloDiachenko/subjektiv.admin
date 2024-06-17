import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ProfileDetailsProps {
    user: MainAdminUserGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
