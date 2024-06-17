import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface PayoutInformationProps {
    user: MainAdminUserGetIdResponseDto;
    contentType: "oneUser" | "verifyUser";
}
