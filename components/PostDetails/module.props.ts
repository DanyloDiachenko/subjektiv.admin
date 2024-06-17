import {
    ArtworkPreviewWithAuthorDto,
    AttachmentPublicDto,
    MainAdminArtworkGetIdResponseDto,
    MainArtworkPostGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";

export interface EventDetailsProps {
    post: MainArtworkPostGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
    setPostAttachments: (postAttachments: AttachmentPublicDto[]) => void;
    setPostId: (postId: number) => void;
    setPostText: (postText: string) => void;
    setPostEventId: (postEventId: number) => void;
    setPostPublishDate: (publishDate: string | undefined) => void;
    setArtwork: (
        artwork: MainAdminArtworkGetIdResponseDto | ArtworkPreviewWithAuthorDto,
    ) => void;
}
