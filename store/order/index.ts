import { AnyAction } from "redux";
import { initStore } from "./initStore";

const orderReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_ORDER":
            return {
                ...state,
                order: action.order,
            };
        default:
            return state;
    }
};

export default orderReducer;
