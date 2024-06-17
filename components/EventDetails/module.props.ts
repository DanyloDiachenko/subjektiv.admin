import { MainEventGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface EventDetailsProps {
    event: MainEventGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
