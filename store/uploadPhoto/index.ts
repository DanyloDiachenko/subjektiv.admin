import { AnyAction } from "redux";
import { IUploadProps, initStore } from "./initStore";

const uploadReducer = (state: IUploadProps = initStore, action: AnyAction) => {
    switch (action.type) {
        case "UPLOAD_PHOTO": {
            return {
                ...state,
                uploadPhoto: action.uploadPhoto,
            };
        }

        default: {
            return state;
        }
    }
};

export default uploadReducer;
