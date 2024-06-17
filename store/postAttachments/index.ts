import { AnyAction } from "redux";
import { initStore } from "./initStore";

const postAttachmentsReducer = (state = initStore, action: AnyAction) => {
    switch (action.type) {
        case "SET_POST_ATTACHMENTS":
            return {
                ...state,
                postAttachments: action.postAttachments,
            };
        case "SET_POST_ID": {
            return {
                ...state,
                postId: action.postId,
            };
        }
        case "SET_POST_TEXT": {
            return {
                ...state,
                postText: action.postText,
            };
        }
        case "SET_POST_EVENTID": {
            return {
                ...state,
                postEventId: action.postEventId,
            };
        }
        case "SET_POST_PUBLISH_DATE": {
            return {
                ...state,
                postPublishDate: action.postPublishDate,
            };
        }
        default:
            return state;
    }
};

export default postAttachmentsReducer;
