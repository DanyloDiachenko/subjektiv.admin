import { IPostAttachmentsStore } from "@/store/postAttachments/initStore";

export interface ArtworkPostsPopupProps {
    closePopup: () => void;
    setPostAttachments: (
        postAttachments: IPostAttachmentsStore["postAttachments"],
    ) => void;
    postAttachments: IPostAttachmentsStore["postAttachments"];
    postId: number;
    artworkId: number;
    setPostText: (postText: string) => void;
    postText: string;
    setPostEventId: (postEventId: number) => void;
    postEventId: number;
    postPublishDate: string | undefined;
    setPostPublishDate: (postPublishDate: string | undefined) => void;
}
