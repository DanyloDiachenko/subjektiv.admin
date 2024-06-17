"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "../UI/Button";

import apiClient from "@/api/apiClient";
import { UserAddressProps } from "./module.props";
import { AddressDto } from "@/submodules/common-dto/api-client/main/models/AddressDto";
import { connect } from "react-redux";
import { IRootState } from "@/store";
import { ShippingAddressBlock } from "./ShippingAddressBlock";
import { NotRecordsYet } from "../NotRecordsYet";

export const UserShippingAdressComponent = ({
    username,
    setOpenPopup,
    openPopup,
}: UserAddressProps): JSX.Element => {
    const [currentPage, _] = useState<number>(1);
    const [isContentOpened, setIsContentOpened] = useState<boolean>(true);
    const [shippingAddresses, setShippingAddresses] = useState<AddressDto[]>(
        [],
    );

    const openAddAddressPopup = () => {
        setOpenPopup("addShippingAddress");
    };

    const getShippingAddres = async () => {
        await apiClient.main.address
            .addressControllerGetAddresses({
                page: 1,
                username: username,
            })
            .then((response) => {
                setShippingAddresses(response.items);
            });
    };

    useEffect(() => {
        getShippingAddres();
    }, [currentPage, openPopup]);

    return (
        <div className={styles.card} id="shippingAddress">
            <div className={styles.cardHeader}>
                <div className={styles.leftColumn}>
                    <h2>Shipping address</h2>
                    <Image
                        src="/media/arrow-top.svg"
                        alt="arrow"
                        width="20"
                        height="21"
                        className={!isContentOpened ? styles.arrowDown : ""}
                        onClick={() => setIsContentOpened(!isContentOpened)}
                    />
                </div>
                <div className={styles.rightColumn}>
                    <Button
                        appearance="lightBlue"
                        className={styles.button}
                        onClick={openAddAddressPopup}
                    >
                        <span className={styles.plus}>
                            <Image
                                src="/media/plus-blue.svg"
                                alt="plus"
                                width="18"
                                height="18"
                            />
                        </span>
                        Add New
                    </Button>
                </div>
            </div>
            {isContentOpened && (
                <>
                    {shippingAddresses.length ? (
                        <div className={styles.cardWrapper}>
                            {shippingAddresses?.map((item, index) => (
                                <ShippingAddressBlock
                                    data={item}
                                    index={index + 1}
                                />
                            ))}
                        </div>
                    ) : (
                        <NotRecordsYet />
                    )}
                </>
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
};

const connector = connect(mapState, mapDispatch);

export const UserShippingAdress = connector(UserShippingAdressComponent);
