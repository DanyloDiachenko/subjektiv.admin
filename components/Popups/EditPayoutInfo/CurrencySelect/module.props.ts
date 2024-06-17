import { CurrencyEnum } from "@/submodules/common-dto/api-client/main";

export interface UserCountrySelectProps {
    activeCurrency: string | null;
    onCurrencySelect: (currency: CurrencyEnum) => void;
}
