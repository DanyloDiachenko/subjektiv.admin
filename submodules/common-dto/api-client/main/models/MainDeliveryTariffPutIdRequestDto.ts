/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryOperator } from './DeliveryOperator';
export type MainDeliveryTariffPutIdRequestDto = {
    operator?: DeliveryOperator;
    /**
     * The price of the delivery
     */
    price?: number;
    /**
     * The weight of the delivery
     */
    weight?: number;
    /**
     * The id of the country from which the delivery is made
     */
    country_from_id?: number | null;
    /**
     * The id of the country to which the delivery is made
     */
    country_to_id?: number | null;
};

