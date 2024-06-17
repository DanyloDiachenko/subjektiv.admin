import { MainArtworkOrderGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

export interface IOrderStore {
    order: MainArtworkOrderGetIdResponseDto;
}

export const initStore: IOrderStore | object = {};
