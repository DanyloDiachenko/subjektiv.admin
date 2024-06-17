import { MainAdminArtworkGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface IArtworkStore {
    artwork: MainAdminArtworkGetIdResponseDto;
}

export const initStore: IArtworkStore | object = {};
