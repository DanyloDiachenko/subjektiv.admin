/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrencyEnum } from './CurrencyEnum';
import type { PaymentOperatorEnum } from './PaymentOperatorEnum';
import type { ProfileTypeEnum } from './ProfileTypeEnum';
export type UserPayoutReceiverDto = {
    /**
     * Id of user
     */
    id: string;
    /**
     * Users ID used for building chat identifiers
     */
    chat_id: string;
    /**
     * The username of the user
     */
    username: string;
    /**
     * The first name of the user
     */
    first_name: string | null;
    /**
     * The last name of the user
     */
    last_name: string | null;
    /**
     * The ID of the user avatar
     */
    avatar_id: string | null;
    /**
     * The position of the user
     */
    position: string | null;
    /**
     * The email of the user
     */
    email: string;
    profile_type: ProfileTypeEnum;
    /**
     * Payment first name
     */
    payment_first_name: string | null;
    /**
     * Payment last name
     */
    payment_last_name: string | null;
    /**
     * IBAN
     */
    iban: string | null;
    /**
     * SWIFT
     */
    swift: string | null;
    currency: CurrencyEnum | null;
    payment_operator: PaymentOperatorEnum | null;
};

