import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface CountryFromSelectorProps {
    countryFrom: null | CountryDto;
    setCountryFrom: (country: CountryDto) => void;
}
