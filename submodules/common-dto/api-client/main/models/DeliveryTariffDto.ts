/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryOperator } from './DeliveryOperator';
export type DeliveryTariffDto = {
    /**
     * Id
     */
    id: number;
    /**
     * Price
     */
    price: number;
    /**
     * Weight
     */
    weight: number;
    operator: DeliveryOperator;
    /**
     * Country from
     */
    country_from: Record<string, any> | null;
    /**
     * Country to
     */
    country_to: Record<string, any> | null;
};

