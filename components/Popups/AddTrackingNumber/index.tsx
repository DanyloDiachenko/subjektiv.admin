"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import { IRootState } from "@/store";
import { Input } from "@/components/UI/Input";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";

export const AddTrackingNumberPopupComponent = ({
    openPopup,
    closePopup,
    orderId,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const popupRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(popupRef, () => {
        closePopup();
    });

    const [trackingNumber, setTrackingNumber] = useState<string>("");

    const onChangeValue = (value: string) => {
        setTrackingNumber(value);
    };

    const editTrackerNumber = async () => {
        await apiClient.main.artworkOrder
            .artworkOrderControllerPutId({
                id: orderId,
                requestBody: { delivery_tracking_number: trackingNumber },
            })
            .then(() => {
                router.refresh();
                closePopup();
            });
    };

    const getOrder = async () => {
        const orderResponse =
            await apiClient.main.artworkOrder.artworkOrderControllerGetById({
                id: orderId,
            });

        setTrackingNumber(orderResponse.delivery_tracking_number || "");
    };

    useEffect(() => {
        getOrder();
    }, []);

    return (
        <>
            {openPopup === "add-tracking-number" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Add Tracking Number
                            </div>
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
                            <label
                                htmlFor="packaging-type"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Tracking Number
                                </div>
                                <Input
                                    className={`${styles.input}`}
                                    placeholder="Type Tracking Number"
                                    value={trackingNumber}
                                    disabled={false}
                                    onChange={(e) =>
                                        onChangeValue(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button
                                    appearance="blue"
                                    onClick={editTrackerNumber}
                                >
                                    Submit
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
    orderId: state.openPopup.orderId,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const AddTrackingNumberPopup = connector(
    AddTrackingNumberPopupComponent,
);
