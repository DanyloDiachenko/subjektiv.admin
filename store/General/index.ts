import { AnyAction } from "redux";
import { initStore } from "./initStore";

const generalReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_GENERAL_DATA":
            return {
                ...state,
                generalData: action.generalData,
            };
        case "SET_ADD_NEW_GENERAL":
            return {
                ...state,
                addNewGeneral: action.addNewGeneral,
            };

        default:
            return state;
    }
};

export default generalReducer;
