"use client";

import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import { AddressDto } from "@/submodules/common-dto/api-client/main/models/AddressDto";
import { IRootState } from "@/store";
import { AddressPreviewDto } from "@/submodules/common-dto/api-client/main";

interface IAddressBlock {
    data: AddressDto | AddressPreviewDto;
    index: number;
    setOpenPopup: (popup: string) => void;
    setShippingAddressId: (value: number) => void;
    deleteBtn?: boolean;
    showBtn?: boolean;
    showTitle?: boolean;
    className?: string;
}

const ShippingAddressBlockComponent = ({
    data,
    index,
    setOpenPopup,
    setShippingAddressId,
    deleteBtn = true,
    showBtn = true,
    showTitle = true,
    className,
}: IAddressBlock) => {
    const openEdit = () => {
        setOpenPopup("editShippingAddress");
        setShippingAddressId(data.id);
    };
    const deleteAddress = () => {
        setOpenPopup("confirm-address-delete");
        setShippingAddressId(data.id);
    };

    if (!data) {
        return <b>no shipping address</b>;
    }

    console.log(data);

    return (
        <div className={`${styles.shippingAddress} `}>
            <div className={styles.infoBlock}>
                <div className={styles.contentWrapper}>
                    {showTitle && (
                        <div className={styles.title}>
                            <div>Address {index + 1}</div>
                            {index === 1 && (
                                <div className={styles.status}>Primary</div>
                            )}
                        </div>
                    )}

                    <div
                        className={`${styles[className as string]} ${
                            styles.info
                        } `}
                    >
                        {data.house_number || ""} {data.street || ""}
                        <br />
                        {data.city ?? ""}
                        <br />
                        {data.country.title ?? ""}
                    </div>
                </div>
            </div>
            {showBtn && (
                <div className={styles.btnBlock}>
                    {deleteBtn && (
                        <Button
                            appearance="grey"
                            className={styles.button}
                            onClick={deleteAddress}
                        >
                            Delete
                        </Button>
                    )}

                    <Button
                        appearance="grey"
                        className={styles.button}
                        onClick={openEdit}
                    >
                        Edit
                    </Button>
                </div>
            )}
        </div>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setShippingAddressId: (addressId: number) => ({
        type: "SET_SHIPPING_ADDRESS_ID",
        addressId,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ShippingAddressBlock = connector(ShippingAddressBlockComponent);
