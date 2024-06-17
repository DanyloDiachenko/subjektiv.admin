"use client";

import Image from "next/image";
import { useRef } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";

import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";

import { IRootState } from "@/store";
import apiClient from "@/api/apiClient";

export const ConfirmAddressDeletePopupComponent = ({
    openPopup,
    closePopup,
    addressId,
}: EditUserPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(popupRef, () => {
        closePopup();
    });
    const confirm = (id: number) => {
        apiClient.main.address
            .addressControllerDeleteAddress({ id: id })
            .then(() => {
                closePopup();
            });
    };

    return (
        <>
            {openPopup === "confirm-address-delete" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>Delete</div>
                            <button
                                className={styles.buttonClose}
                                onClick={closePopup}
                            >
                                <Image
                                    src="/media/close.svg"
                                    alt="close"
                                    width="10"
                                    height="10"
                                />
                            </button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.text}>
                                You really want to delete Shipping address?
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button
                                    appearance="red"
                                    onClick={() => confirm(addressId)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
    addressId: state.openPopup.addressId,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const ConfirmAddressDeletePopup = connector(
    ConfirmAddressDeletePopupComponent,
);
