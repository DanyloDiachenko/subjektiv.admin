import { MainCountriesGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface CountryDetailsProps {
    country: MainCountriesGetIdResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
