/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ApiResponse_MainCountriesPostResponseDto = {
    /**
     * Indicates whether the request was successful
     */
    success: boolean;
    data: {
        /**
         * Id of country
         */
        id: number;
        /**
         * Localized title of country
         */
        title: string;
        /**
         * ID of flag image
         */
        flag_image_id: string | null;
        /**
         * VAT rate. To view: [ACCESS: Required access functions: main.country:view]
         */
        vat_rate: number | null;
        /**
         * Tax rate. To view: [ACCESS: Required access functions: main.country:view]
         */
        tax_rate: number | null;
        /**
         * Operational fee. To view: [ACCESS: Required access functions: main.country:view]
         */
        operational_fee: number | null;
        /**
         * Country code
         */
        short_code: string | null;
    };
};

