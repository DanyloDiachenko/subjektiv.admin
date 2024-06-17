import { MainArtworkCommentQuestionGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ReflectionQuestionDetailsProps {
    reflectionQuestion: MainArtworkCommentQuestionGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
