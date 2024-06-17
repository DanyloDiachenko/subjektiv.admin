import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface UserCountrySelectProps {
    onCountryClick: (country: CountryDto) => void;
}
