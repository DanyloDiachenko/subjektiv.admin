export interface ArtworkMaterialsSelectProps {
    materialIds: number[];
    addMaterialToPatchArtwork: (materialId: number) => void;
    removeMaterialFromPatchArtwork: (materialId: number) => void;
}
