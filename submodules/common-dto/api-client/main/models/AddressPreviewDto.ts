/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryDto } from './CountryDto';
export type AddressPreviewDto = {
    /**
     * Id of address
     */
    id: number;
    /**
     * Country
     */
    country: CountryDto;
    /**
     * City
     */
    city: string;
    /**
     * Street
     */
    street: string;
    /**
     * House number
     */
    house_number: string | null;
    /**
     * Zipcode
     */
    zipcode: string;
    /**
     * Fullname
     */
    fullname: string;
    /**
     * Phone
     */
    phone: string;
    /**
     * Is address active
     */
    is_active: boolean;
};

