import { AnyAction } from "redux";
import { initStore } from "./initStore";

const payoutInfoReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_PAYOUT_INFO":
            return {
                ...state,
                payoutInfo: action.payoutInfo,
            };

        default:
            return state;
    }
};

export default payoutInfoReducer;
