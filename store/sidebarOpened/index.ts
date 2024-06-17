import { AnyAction } from "redux";
import { initStore } from "./initStore";

const sidebarReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_SIDEBAR_OPENED":
            return {
                ...state,
                isOpened: action.isOpened,
            };
        default:
            return state;
    }
};

export default sidebarReducer;
