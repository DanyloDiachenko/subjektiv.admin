import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    CountryDto,
    DeliveryOperator,
} from "@/submodules/common-dto/api-client/main";

export interface CountriesSelectProps {
    onOperatorClick: (operator: ISelectVariant) => void;
    operatorDefault: DeliveryOperator | undefined;

    countryFromId: number | undefined;
    onCountryFromClick: (country: CountryDto) => void;

    countryToId: number | undefined;
    onCountryToClick: (country: CountryDto) => void;
}
