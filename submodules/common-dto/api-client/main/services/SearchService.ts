/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MainSearchGetResponseDto } from '../models/MainSearchGetResponseDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class SearchService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Search in artworks and artists
     * @returns MainSearchGetResponseDto Users
     * @throws ApiError
     */
    public searchControllerSearch({
        term,
    }: {
        /**
         * Search term
         */
        term: string,
    }): CancelablePromise<MainSearchGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/search',
            query: {
                'term': term,
            },
        });
    }
}
