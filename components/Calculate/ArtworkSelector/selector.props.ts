import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkSelectorProps {
    artwork: null | ArtworkAdminItemDto;
    setArtwork: (artwork: ArtworkAdminItemDto) => void;
}
