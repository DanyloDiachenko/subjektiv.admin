import { MainEventGetResponseDto } from "@/submodules/common-dto/api-client/main";

export interface EventsTableProps {
    eventsResponse: MainEventGetResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
