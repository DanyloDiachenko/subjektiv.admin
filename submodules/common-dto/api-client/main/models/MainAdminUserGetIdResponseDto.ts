/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryDto } from './CountryDto';
import type { CurrencyEnum } from './CurrencyEnum';
import type { DocumentsVerificationStatus } from './DocumentsVerificationStatus';
import type { PaymentOperatorEnum } from './PaymentOperatorEnum';
import type { TestingGroupsEnum } from './TestingGroupsEnum';
import type { UserDocumentType } from './UserDocumentType';
import type { UserVerificationStatus } from './UserVerificationStatus';
export type MainAdminUserGetIdResponseDto = {
    /**
     * Id of user
     */
    id: string;
    /**
     * Users ID used for building chat identifiers
     */
    chat_id: string;
    /**
     * Username of user
     */
    username: string;
    /**
     * Email of user
     */
    email: string;
    /**
     * First name of user
     */
    first_name: string | null;
    /**
     * Last name of user
     */
    last_name: string | null;
    /**
     * Avatar id of user
     */
    avatar_id: string | null;
    /**
     * Background image
     */
    bg_image_id: string | null;
    /**
     * Description of user
     */
    description: string | null;
    /**
     * Position of user
     */
    position: string | null;
    /**
     * Link to users social media
     */
    social_link: string | null;
    /**
     * Count of users followers
     */
    followers_number: number;
    /**
     * Count of followings
     */
    followings_number: number;
    /**
     * Is user artist
     */
    is_artist: boolean;
    /**
     * Is user expert
     */
    is_expert: boolean;
    /**
     * Is user featured artist
     */
    is_featured_artist: boolean;
    /**
     * Is user active
     */
    is_active: boolean;
    /**
     * City id of user
     */
    city_id: number | null;
    /**
     * Country of user
     */
    country: CountryDto | null;
    /**
     * CV file id
     */
    cv_file_id: string | null;
    /**
     * CV file name
     */
    cv_file_name: string | null;
    /**
     * Create date
     */
    created_at: string;
    /**
     * ID of the front image of the user document
     */
    document_front_image_id: string | null;
    /**
     * ID of the back image of the user document
     */
    document_back_image_id: string | null;
    document_type: UserDocumentType | null;
    verification_status: UserVerificationStatus;
    /**
     * Reason for verification failure
     */
    verification_failed_reason: string | null;
    /**
     * Date when the user was verified
     */
    verification_date: string | null;
    /**
     * Date when the user uploaded documents
     */
    upload_documents_date: string | null;
    documents_verification_status: DocumentsVerificationStatus;
    /**
     * Date when the documents was verified
     */
    documents_verification_date: string | null;
    /**
     * Reason for documents verification failure
     */
    document_verification_failed_reason: string | null;
    /**
     * VAT number
     */
    vat_number: string | null;
    /**
     * User residence country
     */
    residence_country: CountryDto | null;
    /**
     * Iban
     */
    iban: string | null;
    /**
     * Swift
     */
    swift: string | null;
    /**
     * First name for payment
     */
    payment_first_name: string | null;
    /**
     * Last name for payment
     */
    payment_last_name: string | null;
    /**
     * Requisites update date
     */
    requisites_update_date: string | null;
    /**
     * Is user wants to be an expert
     */
    is_expert_wanted: boolean;
    currency: CurrencyEnum | null;
    payment_operator: PaymentOperatorEnum | null;
    testing_groups: Array<TestingGroupsEnum>;
};

