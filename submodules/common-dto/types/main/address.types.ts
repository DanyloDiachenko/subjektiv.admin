import { ICountry } from './country.types';

export interface IAddressItem {
    id: number;
    country: ICountry;
    city: string;
    street: string;
    house_number: string | null;
    zipcode: string;
    fullname: string;
    phone: string;
    is_active: boolean;
}

export type IAddressPreview = IAddressItem;
