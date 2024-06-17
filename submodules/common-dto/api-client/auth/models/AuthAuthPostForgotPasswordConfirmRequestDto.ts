/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AuthAuthPostForgotPasswordConfirmRequestDto = {
    /**
     * Email of the User
     */
    email: string;
    /**
     * Confirmation code received by user
     */
    code: string;
    /**
     * The new password of the User
     */
    password: string;
};

