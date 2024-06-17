/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CognitoEmailChangeEmailDto } from './CognitoEmailChangeEmailDto';
import type { CognitoEmailForgotPasswordDto } from './CognitoEmailForgotPasswordDto';
import type { CognitoEmailResendCodeDto } from './CognitoEmailResendCodeDto';
import type { CognitoEmailSignUpDto } from './CognitoEmailSignUpDto';
export type CognitoEmailDto = {
    /**
     * Trigger source
     */
    trigger_source: CognitoEmailDto.trigger_source;
    /**
     * Email of user
     */
    email: string;
    additional_data: (CognitoEmailSignUpDto | CognitoEmailResendCodeDto | CognitoEmailForgotPasswordDto | CognitoEmailChangeEmailDto);
};
export namespace CognitoEmailDto {
    /**
     * Trigger source
     */
    export enum trigger_source {
        CUSTOM_EMAIL_SENDER_SIGN_UP = 'CustomEmailSender_SignUp',
        CUSTOM_EMAIL_SENDER_RESEND_CODE = 'CustomEmailSender_ResendCode',
        CUSTOM_EMAIL_SENDER_FORGOT_PASSWORD = 'CustomEmailSender_ForgotPassword',
        CUSTOM_EMAIL_SENDER_UPDATE_USER_ATTRIBUTE = 'CustomEmailSender_UpdateUserAttribute',
    }
}

