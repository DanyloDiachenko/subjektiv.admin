import { createStore, combineReducers } from "redux";
import popupReducer from "./popup";
import editMediaReducer from "./editMedia";
import uploadReducer from "./uploadPhoto";
import artworkReducer from "./artwork";
import generalReducer from "./General";
import artworksToModerateReducer from "./artworkToModerate";
import orderReducer from "./order";
import postAttachmentsReducer from "./postAttachments";
import payoutInfoReducer from "./payoutInfo";
import imagePopupReducer from "./imagePopup";
import sidebarReducer from "./sidebarOpened";

export const store = createStore(
    combineReducers({
        openPopup: popupReducer,
        editMedia: editMediaReducer,
        uploadPhoto: uploadReducer,
        artwork: artworkReducer,
        general: generalReducer,
        artworksToModerate: artworksToModerateReducer,
        order: orderReducer,
        postAttachments: postAttachmentsReducer,
        payoutInfo: payoutInfoReducer,
        imagePopup: imagePopupReducer,
        sidebarOpened: sidebarReducer,
    }),
);

export type IRootState = ReturnType<typeof store.getState>;
