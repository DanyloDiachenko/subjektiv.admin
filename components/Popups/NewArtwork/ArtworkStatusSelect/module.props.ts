import { ArtWorkStatus } from "@/submodules/common-dto/api-client/main";

export interface ArtworkStatusSelectProps {
    status: string;
    onStatusClick: (status: ArtWorkStatus) => void;
}
