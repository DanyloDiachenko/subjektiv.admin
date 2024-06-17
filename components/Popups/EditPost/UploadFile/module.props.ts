import {
    ArtworkPostItemDto,
    AttachmentPublicDto,
} from "@/submodules/common-dto/api-client/main";

type LocalImageType = {
    id: number;
    src: string;
    type: "local";
};
type ImageType = AttachmentPublicDto | LocalImageType;

export interface AlternativeImagesProps {
    post: ArtworkPostItemDto;
    postImages: ImageType[];
    setPostImages: (postImages: ImageType[]) => void;
    deleteImage: (imageId: number) => void;
}
