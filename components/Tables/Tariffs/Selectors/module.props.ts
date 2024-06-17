import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface CountriesSelectProps {
    onCountryFromClick: (country: CountryDto | null) => void;
    onCountryToClick: (country: CountryDto | null) => void;
}
