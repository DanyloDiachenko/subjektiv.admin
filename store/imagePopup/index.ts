import { AnyAction } from "redux";
import { initStore } from "./initStore";

const imagePopupReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_IMAGE_POPUP":
            return {
                ...state,
                imageSrc: action.imageSrc,
            };

        default:
            return state;
    }
};

export default imagePopupReducer;
