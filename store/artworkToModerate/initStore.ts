export interface IArtworkToModerateStore {
    artworksToModerate: number[];
}

export const initStore: IArtworkToModerateStore = {
    artworksToModerate: [],
};
