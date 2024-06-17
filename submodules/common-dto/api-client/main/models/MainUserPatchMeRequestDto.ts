/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyEnum } from './CurrencyEnum';
import type { UserDocumentType } from './UserDocumentType';
export type MainUserPatchMeRequestDto = {
    /**
     * UserName
     */
    username?: string;
    /**
     * First name of user
     */
    first_name?: string;
    /**
     * Last name of user
     */
    last_name?: string;
    /**
     * Avatar id of user
     */
    avatar_id?: string;
    /**
     * Background image
     */
    bg_image_id?: string;
    /**
     * CV file id
     */
    cv_file_id?: string | null;
    /**
     * CV file name
     */
    cv_file_name?: string | null;
    /**
     * VAT number for seller
     */
    vat_number?: string | null;
    /**
     * OKPO for Fondy
     */
    tax_number?: string | null;
    currency?: CurrencyEnum | null;
    /**
     * Iban
     */
    iban?: string | null;
    /**
     * Swift
     */
    swift?: string | null;
    /**
     * Phone number
     */
    phone?: string | null;
    /**
     * Payment first name
     */
    payment_first_name?: string | null;
    /**
     * Payment last name
     */
    payment_last_name?: string | null;
    /**
     * Description of user
     */
    description?: string;
    /**
     * Position of user
     */
    position?: string;
    /**
     * City id of user
     */
    city_id?: number;
    /**
     * Country id of user
     */
    country_id?: number;
    /**
     * Link to users social media
     */
    social_link?: string | null;
    /**
     * ID of front document
     */
    document_front_image_id?: string | null;
    /**
     * ID of back document
     */
    document_back_image_id?: string | null;
    document_type?: UserDocumentType;
    /**
     * Is user artist
     */
    is_artist?: boolean;
    /**
     * Is user expert
     */
    is_expert?: boolean;
    /**
     * Residence country id of user
     */
    country_residency_id?: number;
};

