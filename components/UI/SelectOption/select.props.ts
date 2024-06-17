import { CountryDto } from "@/submodules/common-dto/api-client/main/models/CountryDto";

import { CityDto } from "@/submodules/common-dto/api-client/main/models/CityDto";
import { MaterialDto } from "@/submodules/common-dto/api-client/main/models/MaterialDto";
import { ISelectVariant } from "../Select/variant.interface";

export type SelectOptionType =
    | CountryDto
    | CityDto
    | ISelectVariant
    | MaterialDto;
export interface SelectOptionProps {
    variants: ISelectVariant[] | CountryDto[] | CityDto[] | MaterialDto[];
    setVariant?: (variant: SelectOptionType) => void;
    placeholder: string;
    activeValue?: string;
    errorMessage?: string | null;
    isShowArrow?: boolean;
}
