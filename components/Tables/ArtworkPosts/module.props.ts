import {
    AttachmentPublicDto,
    MainArtworkPostGetResponseDto,
} from "@/submodules/common-dto/api-client/main";

export interface ArtworkPostsTableProps {
    postsResponse: MainArtworkPostGetResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setPostAttachments: (postAttachments: AttachmentPublicDto[]) => void;
    setPostId: (postId: number) => void;
    setPostText: (postText: string) => void;
    setPostEventId: (postEventId: number) => void;
    setPostPublishDate: (publishDate: string | undefined) => void;
}
