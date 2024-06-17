import { IPayoutInfoStore } from "@/store/payoutInfo/initStore";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;
    payoutInfo: IPayoutInfoStore;
}
