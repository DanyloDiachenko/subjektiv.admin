import { AnyAction } from "redux";
import { initStore } from "./initStore";

const editMediaReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_IMAGES":
            return {
                ...state,
                images: action.images,
            };
        case "SET_ALTERNATIVE_IMAGES":
            return {
                ...state,
                alternativeImages: action.alternativeImages,
            };
        case "SET_EDITING_IMAGE":
            return {
                ...state,
                editingImage: action.editingImage,
            };
        case "SET_IMAGES_POPUP_TYPE":
            return {
                ...state,
                imagesPopupType: action.imagesPopupType,
            };

        default:
            return state;
    }
};

export default editMediaReducer;
