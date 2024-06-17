import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;

    user: MainAdminUserGetIdResponseDto;
}
