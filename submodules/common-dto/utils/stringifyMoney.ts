import { CurrencyEnum } from '../api-client/main';
import { LocaleCodeEnum } from '../constants/localeCode.enum';

export const stringifyMoney = (
    value: number,
    currency: CurrencyEnum,
    localeCode: LocaleCodeEnum = LocaleCodeEnum.en,
): string => {
    const divided = value / 100;
    const formatter = new Intl.NumberFormat(localeCode, {
        style: 'currency',
        currency,
        minimumFractionDigits: divided % 1 === 0 ? 0 : 2,
    });

    return formatter.format(divided);
};
