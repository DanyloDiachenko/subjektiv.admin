/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_AuthAuthPostForgotPasswordResponseDto } from '../models/ApiResponse_AuthAuthPostForgotPasswordResponseDto';
import type { ApiResponse_AuthAuthPostLoginResponseDto } from '../models/ApiResponse_AuthAuthPostLoginResponseDto';
import type { ApiResponse_AuthAuthPostRefreshTokenResponseDto } from '../models/ApiResponse_AuthAuthPostRefreshTokenResponseDto';
import type { ApiResponse_AuthAuthPostRegisterConfirmResponseDto } from '../models/ApiResponse_AuthAuthPostRegisterConfirmResponseDto';
import type { ApiResponse_AuthAuthPostRegisterResendCodeResponseDto } from '../models/ApiResponse_AuthAuthPostRegisterResendCodeResponseDto';
import type { ApiResponse_AuthAuthPostRegisterResponseDto } from '../models/ApiResponse_AuthAuthPostRegisterResponseDto';
import type { AuthAuthGetLoginEventEmailResponseDto } from '../models/AuthAuthGetLoginEventEmailResponseDto';
import type { AuthAuthPostChangeEmailCancelRequestDto } from '../models/AuthAuthPostChangeEmailCancelRequestDto';
import type { AuthAuthPostChangeEmailConfirmRequestDto } from '../models/AuthAuthPostChangeEmailConfirmRequestDto';
import type { AuthAuthPostChangeEmailRequestDto } from '../models/AuthAuthPostChangeEmailRequestDto';
import type { AuthAuthPostChangePasswordRequestDto } from '../models/AuthAuthPostChangePasswordRequestDto';
import type { AuthAuthPostForgotPasswordConfirmRequestDto } from '../models/AuthAuthPostForgotPasswordConfirmRequestDto';
import type { AuthAuthPostForgotPasswordRequestDto } from '../models/AuthAuthPostForgotPasswordRequestDto';
import type { AuthAuthPostLoginRequestDto } from '../models/AuthAuthPostLoginRequestDto';
import type { AuthAuthPostRefreshTokenRequestDto } from '../models/AuthAuthPostRefreshTokenRequestDto';
import type { AuthAuthPostRegisterConfirmRequestDto } from '../models/AuthAuthPostRegisterConfirmRequestDto';
import type { AuthAuthPostRegisterRequestDto } from '../models/AuthAuthPostRegisterRequestDto';
import type { AuthAuthPostRegisterResendCodeRequestDto } from '../models/AuthAuthPostRegisterResendCodeRequestDto';

import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';

export class AuthService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Register by email/password. User will receive an confirmation code to complete registration.
     * @returns ApiResponse_AuthAuthPostRegisterResponseDto User created
     * @throws ApiError
     */
    public authControllerRegister({
        requestBody,
    }: {
        requestBody: AuthAuthPostRegisterRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostRegisterResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Request to resend codeUser will receive an confirmation code to complete registration.
     * @returns ApiResponse_AuthAuthPostRegisterResendCodeResponseDto User will receive code
     * @throws ApiError
     */
    public authControllerResendConfirmationCode({
        requestBody,
    }: {
        requestBody: AuthAuthPostRegisterResendCodeRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostRegisterResendCodeResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register/resend-code',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Confirm registration. Apply received code to complete registration.
     * @returns ApiResponse_AuthAuthPostRegisterConfirmResponseDto
     * @throws ApiError
     */
    public authControllerRegisterConfirm({
        requestBody,
    }: {
        requestBody: AuthAuthPostRegisterConfirmRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostRegisterConfirmResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/register/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Login by email/password. Returns idToken and refreshToken on success login.
     * @returns ApiResponse_AuthAuthPostLoginResponseDto Login success.
     * @throws ApiError
     */
    public authControllerLogin({
        requestBody,
    }: {
        requestBody: AuthAuthPostLoginRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostLoginResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get new tokens by refresh token.
     * @returns ApiResponse_AuthAuthPostRefreshTokenResponseDto Successfully authorized via refresh token.
     * @throws ApiError
     */
    public authControllerRefreshToken({
        requestBody,
    }: {
        requestBody: AuthAuthPostRefreshTokenRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostRefreshTokenResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/refresh-token',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Initiate restoring of users password.
     * @returns ApiResponse_AuthAuthPostForgotPasswordResponseDto Success response
     * @throws ApiError
     */
    public authControllerForgotPassword({
        requestBody,
    }: {
        requestBody: AuthAuthPostForgotPasswordRequestDto,
    }): CancelablePromise<ApiResponse_AuthAuthPostForgotPasswordResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Confirm forgot password. Apply received code to complete password reset.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public authControllerConfirmForgotPassword({
        requestBody,
    }: {
        requestBody: AuthAuthPostForgotPasswordConfirmRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/forgot-password/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change password.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public authControllerChangePassword({
        requestBody,
    }: {
        requestBody: AuthAuthPostChangePasswordRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Change email.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public authControllerChangeEmail({
        requestBody,
    }: {
        requestBody: AuthAuthPostChangeEmailRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/change-email',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Cancel email change.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public authControllerChangeEmailCancel({
        requestBody,
    }: {
        requestBody: AuthAuthPostChangeEmailCancelRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/change-email/cancel',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Confirm change email.
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public authControllerChangeEmailConfirm({
        requestBody,
    }: {
        requestBody: AuthAuthPostChangeEmailConfirmRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/auth/change-email/confirm',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Redirects to google auth page.
     * @returns any
     * @throws ApiError
     */
    public authControllerAuthByGoogle(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/by/google',
            errors: {
                302: `Redirects to google auth page.`,
            },
        });
    }

    /**
     * Get login events
     * @returns AuthAuthGetLoginEventEmailResponseDto Login events
     * @throws ApiError
     */
    public authControllerGetLoginEvents({
        email,
        page,
    }: {
        email: string,
        /**
         * The page number
         */
        page?: number,
    }): CancelablePromise<AuthAuthGetLoginEventEmailResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/auth/login-event/{email}',
            path: {
                'email': email,
            },
            query: {
                'page': page,
            },
        });
    }

}
