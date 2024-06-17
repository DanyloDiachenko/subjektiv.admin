import LocaleEnum from './locale.enum';

export enum LocaleCodeEnum {
    en = 'en-US',
    ua = 'uk-UA',
    gb = 'en-GB',
    fr = 'fr-FR',
    de = 'de-DE',
    it = 'it-IT',
}

const countryToLocaleMap = new Map<LocaleEnum, LocaleCodeEnum>([
    [LocaleEnum.en, LocaleCodeEnum.en],
    [LocaleEnum.ua, LocaleCodeEnum.ua],
    [LocaleEnum.gb, LocaleCodeEnum.gb],
    [LocaleEnum.fr, LocaleCodeEnum.fr],
    [LocaleEnum.de, LocaleCodeEnum.de],
    [LocaleEnum.it, LocaleCodeEnum.it],
]);

export const countryToLocale = (country: LocaleEnum): LocaleCodeEnum | Error =>
    countryToLocaleMap.get(country) || new Error(`Locale for country ${country} not found`);
