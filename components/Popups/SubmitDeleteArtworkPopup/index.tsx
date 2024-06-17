"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { SubmitDeleteArtworkPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { formatEnumValue } from "@/helpers/formatEnumValue";

export const SubmitDeletePopupComponent = ({
    closePopup,
}: SubmitDeleteArtworkPopupProps): JSX.Element => {
    const router = useRouter();
    const itemId = Number(useParams().id);
    const pathname = usePathname();

    const itemType = pathname.includes("artworks")
        ? "artwork"
        : "delivery_tariff";

    const submit = async () => {
        if (itemType === "artwork") {
            try {
                await apiClient.main.artwork.artworkControllerDeleteArtwork({
                    id: itemId,
                });

                closePopup();
                router.back();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerDelete(
                    {
                        id: itemId,
                    },
                );

                closePopup();
                router.back();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const discard = () => {
        closePopup();
    };

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        Delete {formatEnumValue(itemType)}
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
                    <img src="/media/warning.png" alt="warning" />
                    <div className={styles.text}>
                        Are sure to delete {formatEnumValue(itemType)}{" "}
                        <b>{itemId}?</b>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={discard}>
                            Discard
                        </Button>
                        <Button appearance="blue" onClick={submit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = () => ({});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const SubmitDeletePopup = connector(SubmitDeletePopupComponent);
