import { MainArtworkCommentQuestionGetResponseDto } from "@/submodules/common-dto/api-client/main";

export interface ReflectionsQuestionsTableProps {
    reflectionQuestions: MainArtworkCommentQuestionGetResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
