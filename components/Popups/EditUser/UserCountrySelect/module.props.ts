import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface UserCountrySelectProps {
    activeCountryTitle: string;
    onCountryClick: (country: CountryDto) => void;
}
