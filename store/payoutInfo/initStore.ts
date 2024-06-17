export interface IPayoutInfoStore {
    currency: string | null;
    iban: string | null;
    swift: string | null;
    username: string;
}

export const initStore: IPayoutInfoStore = {
    currency: null,
    iban: null,
    swift: null,
    username: "",
};
