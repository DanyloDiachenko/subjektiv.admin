import { MainDeliveryTariffGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface TariffDetailsProps {
    tariff: MainDeliveryTariffGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
