import { AnyAction } from "redux";
import { initStore } from "./initStore";

const artworkReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_ARTWORK":
            return {
                ...state,
                artwork: action.artwork,
            };
        default:
            return state;
    }
};

export default artworkReducer;
