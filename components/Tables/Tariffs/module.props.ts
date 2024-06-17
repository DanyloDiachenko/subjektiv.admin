import { MainDeliveryTariffGetResponseDto } from "@/submodules/common-dto/api-client/main";

export interface TariffsTableProps {
    tariffsResponse: MainDeliveryTariffGetResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
