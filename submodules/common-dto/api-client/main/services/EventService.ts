/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse_ApiOkResponseDto } from '../models/ApiResponse_ApiOkResponseDto';
import type { ApiResponse_MainEventPostResponseDto } from '../models/ApiResponse_MainEventPostResponseDto';
import type { MainEventGetIdResponseDto } from '../models/MainEventGetIdResponseDto';
import type { MainEventGetResponseDto } from '../models/MainEventGetResponseDto';
import type { MainEventPostRequestDto } from '../models/MainEventPostRequestDto';
import type { MainEventPutIdRequestDto } from '../models/MainEventPutIdRequestDto';
import type { CancelablePromise } from '../../core/CancelablePromise';
import type { BaseHttpRequest } from '../../core/BaseHttpRequest';
export class EventService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * Get event by id.
     * @returns MainEventGetIdResponseDto Event
     * @throws ApiError
     */
    public eventControllerGetEvent({
        id,
        contentLanguage,
    }: {
        /**
         * Id of the event to get
         */
        id: number,
        /**
         * The locale of the request
         */
        contentLanguage?: string,
    }): CancelablePromise<MainEventGetIdResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/event/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Content-Language': contentLanguage,
            },
        });
    }
    /**
     * Update event. To update someone else's event: [ACCESS: Required access functions: main.event:update]
     * @returns ApiResponse_ApiOkResponseDto Updated event
     * @throws ApiError
     */
    public eventControllerUpdateEvent({
        id,
        requestBody,
    }: {
        /**
         * Id of the event to update
         */
        id: number,
        requestBody: MainEventPutIdRequestDto,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/event/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete event. To delete someone else's event: [ACCESS: Required access functions: main.event:delete]
     * @returns ApiResponse_ApiOkResponseDto Operation was successful
     * @throws ApiError
     */
    public eventControllerDeleteEvent({
        id,
    }: {
        /**
         * Id of the event to delete
         */
        id: number,
    }): CancelablePromise<ApiResponse_ApiOkResponseDto> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/event/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get paginated list of events.
     * @returns MainEventGetResponseDto Paginated list of events
     * @throws ApiError
     */
    public eventControllerGetEvents({
        page,
        authorUsername,
        artworkId,
    }: {
        /**
         * Page number. Pass -1 to get all records.
         */
        page?: number,
        /**
         * The username of the author
         */
        authorUsername?: string,
        /**
         * The ID of the artwork
         */
        artworkId?: number,
    }): CancelablePromise<MainEventGetResponseDto> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/event',
            query: {
                'page': page,
                'author_username': authorUsername,
                'artwork_id': artworkId,
            },
        });
    }
    /**
     * Create an event.
     * @returns ApiResponse_MainEventPostResponseDto Operation was successful
     * @throws ApiError
     */
    public eventControllerCreateEvent({
        requestBody,
    }: {
        requestBody: MainEventPostRequestDto,
    }): CancelablePromise<ApiResponse_MainEventPostResponseDto> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/event',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
