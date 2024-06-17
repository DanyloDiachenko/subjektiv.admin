import { MainSubjectGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectGetIdResponseDto";

export interface EditUserPopupProps {
    openPopup: string;
    closePopup: () => void;
    generalData: MainSubjectGetIdResponseDto;
    setGeneralData: (generalData: MainSubjectGetIdResponseDto) => void;
}
