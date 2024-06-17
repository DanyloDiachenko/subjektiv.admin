import { ArtworkAdminItemDto } from "@/submodules/common-dto/api-client/main";

export interface ArtworkIdsSelectProps {
    artworkIds: number[];
    onArtworkClick: (artwork: ArtworkAdminItemDto) => void;
}
