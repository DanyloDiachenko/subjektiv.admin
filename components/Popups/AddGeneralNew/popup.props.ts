import { MainDataIdResponse } from "@/components/GeneralDetails/general.props";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;
    setAddNewGeneral: (addNewGeneral: {
        data: MainDataIdResponse | null;
        place: string | null;
    }) => void;
}
