"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";

import { EditUserPopupProps } from "./popup.props";

import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";

import {
    ArtworkOrderStatus,
    MainArtworkOrderGetIdResponseDto,
    MainArtworkOrderPutRequestDto,
} from "@/submodules/common-dto/api-client/main";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { useParams, useRouter } from "next/navigation";
import OrderStatusTransitionMap from "@/submodules/common-dto/constants/orderStatusTransitionMap";
import { IOrderStore } from "@/store/order/initStore";
import { Select } from "@/components/UI/Select";
interface IRedux extends IRootState {
    order: IOrderStore;
}
export const EditOrderStatusPopupComponent = ({
    openPopup,
    closePopup,
    order,
}: EditUserPopupProps): JSX.Element => {
    const params = useParams();
    const router = useRouter();

    const orderStatus = [
        { title: "New", id: 2, value: ArtworkOrderStatus.PENDING },
        { title: "Order placed", id: 1, value: ArtworkOrderStatus.PAID },
        { title: "Delivering", id: 3, value: ArtworkOrderStatus.DELIVERING },
        {
            title: "Completed",
            id: 5,
            value: ArtworkOrderStatus.PAYOUTS_PROCEED,
        },
        { title: "Canceled", id: 6, value: ArtworkOrderStatus.CANCELED },
    ];

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

    const allowedStatus =
        OrderStatusTransitionMap[order?.status as ArtworkOrderStatus];
    const filteredStatuses = () => {
        const newStatuses = orderStatus.filter((status) =>
            allowedStatus?.some((item) => status.value === item),
        );
        return newStatuses;
    };

    const returnFindedStatus = (): ISelectVariant | null => {
        return (
            filteredStatuses().find(
                (status) => status.value === changedFields.status,
            ) || null
        );
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

    const editOrder = async () => {
        const newResponceBody: MainArtworkOrderPutRequestDto = {
            status: changedFields.status as ArtworkOrderStatus,
        };
        await apiClient.main.artworkOrder
            .artworkOrderControllerPutId({
                id: Number(params.id),
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
                    order_id:
                        transformText(errorMessages.message) ||
                        transformText(errorMessages.order_id),
                };
                setErrorMessages(erroMessagesObject);
            });
    };

    useEffect(() => {
        apiClient.main.artworkOrder
            .artworkOrderControllerGetById({ id: Number(params.id) })
            .then((response) => {
                setChangedFields(response);
            });
    }, [openPopup]);

    return (
        <>
            {openPopup === "edit-order-status" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div
                        className={`${styles.popup} ${styles.status}`}
                        ref={popupRef}
                    >
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
                                <Select
                                    placeholder="Select order status"
                                    variants={filteredStatuses()}
                                    className={styles.select}
                                    setActiveVariant={(
                                        variant: ISelectVariant,
                                    ) =>
                                        onChangeValue(
                                            "status",
                                            (variant as ISelectVariant)!.value,
                                        )
                                    }
                                    activeVariant={returnFindedStatus()}
                                    isRemoveArrow={false}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>
                                {errorMessages.status || errorMessages.order_id}
                            </div>
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

const mapState = (state: IRedux) => ({
    openPopup: state.openPopup.openPopup,
    orderId: state.openPopup.orderId,
    order: state.order.order,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditOrderStatusPopup = connector(EditOrderStatusPopupComponent);
