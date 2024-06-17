import { MainDataIdResponse } from "@/components/GeneralDetails/general.props";

export interface IPopupStore {
    generalData: MainDataIdResponse | null;
    addNewGeneral: {
        data: MainDataIdResponse | null;
        place: string | null;
    };
}

export const initStore: IPopupStore = {
    generalData: null,
    addNewGeneral: {
        data: null,
        place: null,
    },
};
