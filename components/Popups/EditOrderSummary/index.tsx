"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";

import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";

import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";

import { useRouter } from "next/navigation";

import {
    MainArtworkOrderGetIdResponseDto,
    MainArtworkOrderPutRequestDto,
} from "@/submodules/common-dto/api-client/main";

import { Input } from "@/components/UI/Input";

export const EditOrderSummaryPopupComponent = ({
    openPopup,
    closePopup,
    orderId,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const popupRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(popupRef, () => {
        closePopup();
    });

    const [changedFields, setChangedFields] = useState<
        | {
              [key: string]: string | number;
          }
        | MainArtworkOrderGetIdResponseDto
    >({});
    const [errorMessage, setErrorMessage] = useState<string>("");

    const editOrder = async () => {
        const newResponceBody: MainArtworkOrderPutRequestDto = {
            taxes_amount: Number(changedFields.taxes_amount) * 100,
            vat: Number(changedFields.vat_amount) * 100,
            delivery_amount: Number(changedFields.vat_amount) * 100,
        };

        await apiClient.main.artworkOrder
            .artworkOrderControllerPutId({
                id: orderId,
                requestBody: newResponceBody,
            })
            .then(() => {
                router.refresh();
                closePopup();
            })
            .catch((error: any) => {
                const errorMessages = error.response.data;
                setErrorMessage(errorMessages.status);
            });
    };

    useEffect(() => {
        apiClient.main.artworkOrder
            .artworkOrderControllerGetById({ id: orderId })
            .then((response) => {
                setChangedFields({
                    taxes_amount: response.taxes_amount
                        ? response.taxes_amount / 100
                        : 0,
                    vat_amount: response.vat_amount
                        ? response.vat_amount / 100
                        : 0,
                    delivery_amount: response.delivery_amount
                        ? response.delivery_amount / 100
                        : 0,
                });
            });
    }, [openPopup]);

    return (
        <>
            {openPopup === "edit-order-summary" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Edit Order summary
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
                            <label htmlFor="taxes" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Taxes Amount
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        errorMessage && styles.empty
                                    }`}
                                    placeholder="Type taxes"
                                    value={
                                        changedFields.taxes_amount || undefined
                                    }
                                    type="number"
                                    onChange={(e) => {
                                        setChangedFields({
                                            ...changedFields,
                                            taxes_amount: Number(
                                                e.target.value,
                                            ),
                                        });
                                    }}
                                    errorMessage={errorMessage!}
                                />
                            </label>
                            <label htmlFor="vat" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    VAT Number
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        errorMessage && styles.empty
                                    }`}
                                    placeholder="Type VAT number"
                                    value={
                                        changedFields.vat_amount || undefined
                                    }
                                    type="number"
                                    onChange={(e) => {
                                        setChangedFields({
                                            ...changedFields,
                                            vat_amount: Number(e.target.value),
                                        });
                                    }}
                                    errorMessage={errorMessage!}
                                />
                            </label>
                            <label
                                htmlFor="delivery_amount"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Delivery Amount
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        errorMessage && styles.empty
                                    }`}
                                    placeholder="Type Delivery Amount"
                                    value={
                                        changedFields.delivery_amount ||
                                        undefined
                                    }
                                    type="number"
                                    onChange={(e) => {
                                        setChangedFields({
                                            ...changedFields,
                                            delivery_amount: Number(
                                                e.target.value,
                                            ),
                                        });
                                    }}
                                    errorMessage={errorMessage!}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button appearance="blue" onClick={editOrder}>
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

export const EditOrderSummaryPopup = connector(EditOrderSummaryPopupComponent);
