"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { Select } from "@/components/UI/Select";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { sliceTitle } from "@/helpers/sliceTitle";
import {
    MainAddressGetIdResponseDto,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";

const EditArtworkAddressPopupComponent = ({
    openPopup,
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const artworkId = Number(useParams().id);

    const [address, setAddress] = useState<ISelectVariant>({
        value: "",
        title: "",
    });
    const [addressInfo, setAddressInfo] =
        useState<MainAddressGetIdResponseDto | null>(null);
    const [addresses, setAddresses] = useState<ISelectVariant[]>([]);
    const [_, setArtwork] = useState<MainAdminArtworkGetIdResponseDto | null>(
        null,
    );

    const submit = async () => {
        if (!address) {
            return;
        }

        try {
            await apiClient.main.adminArtwork.adminArtworkControllerUpdateArtwork(
                {
                    id: artworkId,
                    requestBody: {
                        address_id: Number(address.value),
                    },
                },
            );

            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const getAndSetDefaultAddress = async () => {
        const artwork =
            await apiClient.main.adminArtwork.adminArtworkControllerGetArtwork({
                id: artworkId,
            });
        setArtwork(artwork);
        const addresses =
            await apiClient.main.address.addressControllerGetAddresses({
                page: -1,
                username: artwork.owner.username,
            });
        setAddresses(
            addresses.items.map((address) => ({
                title: sliceTitle(address.fullname, 30),
                value: String(address.id),
            })),
        );

        if (!artwork.address) {
            setAddress({ title: "", value: "" });
        } else {
            apiClient.main.address
                .addressControllerGetAddressById({ id: artwork.address.id })
                .then((response) => {
                    setAddress({
                        title: response.fullname,
                        value: String(response.id),
                    });
                    setAddressInfo(response);
                });
        }
    };

    useEffect(() => {
        getAndSetDefaultAddress();
    }, []);

    useEffect(() => {
        if (!address?.value) {
            return;
        }
        apiClient.main.address
            .addressControllerGetAddressById({ id: Number(address.value) })
            .then((response) => {
                setAddressInfo(response);
            });
    }, [address?.title]);

    if (!address) {
        return <></>;
    }

    return (
        <>
            <div className={styles.popupBg} onClick={() => closePopup()}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        {openPopup === "addShippingAddress"
                            ? "Add Shipping Address"
                            : " Edit Shipping Address"}
                    </div>
                    <button className={styles.buttonClose} onClick={closePopup}>
                        <Image
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    <label htmlFor="fullName" className={styles.label}>
                        <div className={styles.inputTitle}>Address</div>
                        <Select
                            className={styles.selectAddress}
                            placeholder="Select address"
                            activeVariant={address}
                            setActiveVariant={setAddress}
                            variants={addresses}
                        />
                        <div className={styles.addressInfo}>
                            {addressInfo && (
                                <>
                                    <div>{addressInfo.fullname}</div>
                                    <div>{addressInfo.phone}</div>
                                    <div>
                                        {addressInfo.fullname},{" "}
                                        {addressInfo.city}
                                    </div>
                                    <div>
                                        {addressInfo.street},{" "}
                                        {addressInfo.house_number},{" "}
                                        {addressInfo.zipcode}
                                    </div>
                                </>
                            )}
                        </div>
                    </label>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={closePopup}>
                            Discard
                        </Button>
                        <Button appearance={"blue"} onClick={submit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
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

export const EditArtworkAddressPopup = connector(
    EditArtworkAddressPopupComponent,
);
