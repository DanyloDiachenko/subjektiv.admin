/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LoginEventDto = {
    /**
     * The ID of the login event
     */
    id: number;
    /**
     * The email associated with the login event
     */
    email: string;
    /**
     * The IP address of the login event
     */
    ip: string;
    /**
     * The location of the login event
     */
    location: string;
    /**
     * The device used for the login event
     */
    device: string;
    /**
     * The status of the login event
     */
    status: LoginEventDto.status;
    /**
     * The timestamp when the login event was created
     */
    created_at: string;
};

export namespace LoginEventDto {

    /**
     * The status of the login event
     */
    export enum status {
        SUCCESS = 'SUCCESS',
        FAILURE = 'FAILURE',
    }


}

