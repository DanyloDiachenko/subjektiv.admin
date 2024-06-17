import { AnyAction } from "redux";
import { initStore } from "./initStore";

const artworksToModerateReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_ARTWORKS_TO_MODERATE":
            return {
                ...state,
                artworksToModerate: action.artworksToModerate,
            };
        default:
            return state;
    }
};

export default artworksToModerateReducer;
