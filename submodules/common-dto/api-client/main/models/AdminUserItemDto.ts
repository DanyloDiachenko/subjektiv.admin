/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CountryDto } from './CountryDto';
import type { UserVerificationStatus } from './UserVerificationStatus';
export type AdminUserItemDto = {
    /**
     * Id of user
     */
    id: string;
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
     * Description of user
     */
    description: string | null;
    /**
     * Is user artist
     */
    is_artist: boolean;
    /**
     * Is user expert
     */
    is_expert: boolean;
    /**
     * Is user wants to be an expert
     */
    is_expert_wanted: boolean;
    /**
     * Is user featured artist
     */
    is_featured_artist: boolean;
    /**
     * Is user active
     */
    is_active: boolean;
    /**
     * Country of user
     */
    country: CountryDto | null;
    /**
     * Date of user creation
     */
    created_at: string;
    verification_status: UserVerificationStatus;
    /**
     * Date of verification
     */
    verification_date: string | null;
    /**
     * Reason for verification failure
     */
    verification_failed_reason: string | null;
    /**
     * Date of upload documents
     */
    upload_documents_date: string | null;
    /**
     * Requisites update date
     */
    requisites_update_date: string | null;
    /**
     * VAT number
     */
    vat_number: string | null;
};

