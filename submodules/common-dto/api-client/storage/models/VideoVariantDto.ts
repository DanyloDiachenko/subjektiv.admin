/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VideoPresetEnum } from './VideoPresetEnum';
export type VideoVariantDto = {
    /**
     * Path of the video variant file location
     */
    path: string;
    preset: VideoPresetEnum;
    /**
     * Mime-type of video variant
     */
    mime_type: string;
    /**
     * Height of video variant
     */
    width: number;
    /**
     * Width of video variant
     */
    height: number;
};

