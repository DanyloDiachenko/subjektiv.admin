import {
    AttachmentImageDto,
    AttachmentType,
    AttachmentVideoDto,
} from "@/submodules/common-dto/api-client/main";

export interface IPostAttachmentsStore {
    postAttachments: {
        status: string;
        /**
         * The type of the attachment.
         */
        type: AttachmentType;
        /**
         * The additional data of the attachment
         */
        additional_data: AttachmentImageDto | AttachmentVideoDto;
        /**
         * The creation date of the attachment
         */
        created_at?: string;
        /**
         * The ID of the attachment
         */
        id?: number;
    }[];
    postId: number;
    postText: string;
    postEventId: number;
    postPublishDate: string | undefined;
}

export const initStore: IPostAttachmentsStore = {
    postAttachments: [],
    postId: -1,
    postText: "",
    postEventId: -1,
    postPublishDate: undefined,
};
