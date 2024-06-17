"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { SelectOption } from "@/components/UI/SelectOption";
import { SelectOptionType } from "@/components/UI/SelectOption/select.props";
import {
    ArtworkOrderStatus,
    MainArtworkOrderGetIdResponseDto,
    MainArtworkOrderPutRequestDto,
} from "@/submodules/common-dto/api-client/main";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { Input } from "@/components/UI/Input";
import { returnOrderStatus } from "@/helpers/returnOrderStatuses";
import OrderStatusTransitionMap from "@/submodules/common-dto/constants/orderStatusTransitionMap";

const orderStatus = [
    { title: "New", id: 2, value: ArtworkOrderStatus.PENDING },
    { title: "Order placed", id: 1, value: ArtworkOrderStatus.PAID },
    { title: "Delivering", id: 3, value: ArtworkOrderStatus.DELIVERING },
    { title: "Completed", id: 4, value: ArtworkOrderStatus.COMPLETED },
    {
        title: "Completed",
        id: 5,
        value: ArtworkOrderStatus.PAYOUTS_PROCEED,
    },
    { title: "Canceled", id: 6, value: ArtworkOrderStatus.CANCELED },
];

export const EditOrderInfoPopupComponent = ({
    openPopup,
    closePopup,
    orderId,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();

    const [order, setOrder] = useState<MainArtworkOrderGetIdResponseDto>();
    const [changedFields, setChangedFields] = useState<
        | {
              [key: string]: string | number;
          }
        | MainArtworkOrderGetIdResponseDto
    >({});
    const [errorMessages, setErrorMessages] = useState<{
        [key: string]: string | null;
    }>({});

    const popupRef = useRef<HTMLDivElement | null>(null);

    useClickOutside(popupRef, () => {
        closePopup();
    });
    const allowedStatus =
        OrderStatusTransitionMap[order?.status as ArtworkOrderStatus];

    const filteredStatuses = () => {
        const newStatuses = orderStatus.filter((status) =>
            allowedStatus?.some((item) => status.value === item),
        );
        return newStatuses;
    };
    const onChangeValue = (field: string, value: string | number) => {
        const currentChangedFields = {
            ...changedFields,
            [field]: value,
        };
        setChangedFields(currentChangedFields);
    };

    const transformText = (text: string) => {
        if (text) {
            const parts = text
                .replace(/([a-z])([A-Z])/g, "$1 $2")
                .toLowerCase()
                .split(" ");
            if (parts.length > 0) {
                parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            }

            return parts.join(" ");
        } else {
            return null;
        }
    };

    const editOrder = () => {
        const newResponceBody: MainArtworkOrderPutRequestDto = {
            status: changedFields.status as ArtworkOrderStatus,
            delivery_amount: changedFields.delivery_amount as number,
            delivery_tracking_number:
                changedFields.delivery_tracking_number as string,
        };
        apiClient.main.artworkOrder
            .artworkOrderControllerPutId({
                id: Number(orderId),
                requestBody: newResponceBody,
            })
            .then(() => {
                router.refresh();
                closePopup();
            })
            .catch((error: any) => {
                const errorMessages = error.response.data;

                const erroMessagesObject = {
                    packaging_type: transformText(errorMessages.packaging_type),
                    status: transformText(errorMessages.status),
                    order_id: transformText(errorMessages.message),
                };
                setErrorMessages(erroMessagesObject);
            });
    };

    useEffect(() => {
        try {
            apiClient.main.artworkOrder
                .artworkOrderControllerGetById({ id: Number(orderId) })
                .then((response) => {
                    setChangedFields(response);
                    setOrder(response);
                });
        } catch (error) {
            console.log(error);
        }
    }, [openPopup]);

    return (
        <>
            {openPopup === "edit-order-info" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                {`Edit Order Info #${changedFields.id ?? ""}`}
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
                            <label htmlFor="status" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Order status
                                </div>
                                <SelectOption
                                    placeholder="Delivering"
                                    variants={filteredStatuses()}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue(
                                            "status",
                                            (variant as ISelectVariant)!.value,
                                        )
                                    }
                                    activeValue={returnOrderStatus(
                                        changedFields.status as ArtworkOrderStatus,
                                    )}
                                    errorMessage={
                                        errorMessages.status ||
                                        errorMessages.order_id
                                    }
                                    isShowArrow={
                                        changedFields.status ===
                                            ArtworkOrderStatus.COMPLETED ||
                                        changedFields.status ===
                                            ArtworkOrderStatus.CANCELED
                                    }
                                />
                            </label>

                            <label
                                htmlFor="delivery_tracking_number"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Tracking Number
                                </div>
                                <Input
                                    className={`${styles.input}`}
                                    placeholder="Type Tracking Number"
                                    value={
                                        changedFields.delivery_tracking_number as string
                                    }
                                    disabled={false}
                                    onChange={(e) =>
                                        onChangeValue(
                                            "delivery_tracking_number",
                                            e.target.value,
                                        )
                                    }
                                    errorMessage={errorMessages.packaging_type}
                                />
                            </label>
                            <label
                                htmlFor="delivery-cost"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Delivery cost
                                </div>
                                <Input
                                    className={`${styles.input}`}
                                    placeholder="Delivery cost"
                                    value={
                                        changedFields.delivery_amount === 0
                                            ? ""
                                            : (changedFields.delivery_amount as string)
                                    }
                                    disabled={false}
                                    onChange={(e) =>
                                        onChangeValue(
                                            "delivery_amount",
                                            e.target.value,
                                        )
                                    }
                                    errorMessage={errorMessages.packaging_type}
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

export const EditOrderInfoPopup = connector(EditOrderInfoPopupComponent);
