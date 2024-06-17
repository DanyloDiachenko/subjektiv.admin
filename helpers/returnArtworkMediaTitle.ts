import { ArtWorkImageSide } from "@/submodules/common-dto/api-client/main";

export const returnArtworkMediaTitle = (
    imageSide: ArtWorkImageSide,
): string => {
    const titles = {
        [ArtWorkImageSide.FRONT]: "Front",
        [ArtWorkImageSide.BACK]: "Back",
        [ArtWorkImageSide.LEFT]: "Left",
        [ArtWorkImageSide.RIGHT]: "Right",
        [ArtWorkImageSide.CORNER]: "Corner",
        [ArtWorkImageSide.ALTERNATIVE]: "Alternative",
        [ArtWorkImageSide.VIEW_3_4]: "View 3/4",
    };

    return titles[imageSide];
};
