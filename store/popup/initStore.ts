export interface IPopupStore {
    openPopup: string;
    addressId: number | null;
    orderId: number | null;
}

export const initStore: IPopupStore = {
    openPopup: "",
    addressId: null,
    orderId: null,
};
