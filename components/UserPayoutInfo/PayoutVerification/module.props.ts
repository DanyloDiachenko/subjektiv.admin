import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { IPayoutInfoStore } from "@/store/payoutInfo/initStore";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface PayoutVerificationProps {
    user: MainAdminUserGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setPayoutInfo: (payoutInfo: IPayoutInfoStore) => void;
    contentType: "oneUser" | "verifyUser";

    verificationStatus: ISelectVariant;
    verificationStatuses: ISelectVariant[];
    setVerificationStatus: (status: ISelectVariant) => void;

    verificationFailedReason: string | null;
    setVerificationFailedReason: (reason: string) => void;
}
