import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface CountryToSelectorProps {
    countryTo: null | CountryDto;
    setCountryTo: (country: CountryDto) => void;
}
