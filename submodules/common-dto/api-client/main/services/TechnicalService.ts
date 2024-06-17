/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainTechnicalGetResponseDto } from '../models/MainTechnicalGetResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class TechnicalService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get technical info
     * @returns MainTechnicalGetResponseDto Get technical info
     * @throws ApiError
     */
    public technicalControllerGetTechnicalData(): CancelablePromise<MainTechnicalGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/technical',
        });
    }
}
