import { MainCountriesGetResponseDto } from "@/submodules/common-dto/api-client/main";

export interface CountriesTableProps {
    countriesResponse: MainCountriesGetResponseDto;
    setOpenPopup: (popupToOpen: string) => void;
}
