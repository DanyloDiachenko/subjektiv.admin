import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { CountryDto } from "@/submodules/common-dto/api-client/main";

export interface CountriesSelectProps {
    onOperatorClick: (operator: ISelectVariant) => void;

    onCountryFromClick: (country: CountryDto) => void;

    onCountryToClick: (country: CountryDto) => void;
}
