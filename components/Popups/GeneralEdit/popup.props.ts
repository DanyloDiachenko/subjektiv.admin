import { MainDataIdResponse } from "@/components/GeneralDetails/general.props";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;
    generalData: MainDataIdResponse;
    setGeneralData: (generalData: MainDataIdResponse) => void;
}
