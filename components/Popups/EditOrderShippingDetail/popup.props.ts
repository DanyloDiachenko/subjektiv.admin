import { MainArtworkOrderGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainArtworkOrderGetIdResponseDto";

export interface EditUserPopupProps {
    openPopup: string;
    orderId: number;
    closePopup: () => void;
    order: MainArtworkOrderGetIdResponseDto;
}
