import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface DocumentVerificationProps {
    user: MainAdminUserGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setImagePopup: (imageSrc: string) => void;

    documentVerificationStatus: ISelectVariant;
    setDocumentVerificationStatus: (status: ISelectVariant) => void;
    verificationStatuses: ISelectVariant[];

    documentFailedReason: string | null;
    setDocumentFailedReason: (reason: string) => void;

    contentType: "oneUser" | "verifyUser";
}
