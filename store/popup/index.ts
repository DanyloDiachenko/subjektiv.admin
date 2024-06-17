import { AnyAction } from "redux";
import { initStore } from "./initStore";

const popupReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_OPEN_POPUP":
            return {
                ...state,
                openPopup: action.popupToOpen,
            };
        case "CLOSE_POPUP":
            return {
                ...state,
                openPopup: "",
            };
        case "SET_SHIPPING_ADDRESS_ID":
            return {
                ...state,
                addressId: action.addressId,
            };
        case "SET_ORDER_ID":
            return {
                ...state,
                orderId: action.orderId,
            };

        default:
            return state;
    }
};

export default popupReducer;
