"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
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
    AddressDto,
    DeliveryOperator,
    MainAddressGetIdResponseDto,
    MainAddressGetResponseDto,
    MainArtworkOrderGetIdResponseDto,
    MainArtworkOrderPutRequestDto,
    PackagingType,
} from "@/submodules/common-dto/api-client/main";
import { Input } from "@/components/UI/Input";
import { ShippingAddressBlock } from "@/components/UserShippingAddress/ShippingAddressBlock";
import { IOrderStore } from "@/store/order/initStore";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { sliceTitle } from "@/helpers/sliceTitle";

interface IReduxProps extends IRootState {
    order: IOrderStore;
}

const deliveryComp = [
    {
        title: "DHL",
        id: 1,
        value: DeliveryOperator.DHL,
    },
    {
        title: "Meest",
        id: 1,
        value: DeliveryOperator.MEEST,
    },
    {
        title: "Nova",
        id: 1,
        value: DeliveryOperator.NOVA,
    },
    {
        title: "UPS",
        id: 1,
        value: DeliveryOperator.UPS,
    },
];
const packagingTypes = [
    { title: "Rolled in tube", id: 1, value: PackagingType.ROLLED_IN_TUBE },
    {
        title: "Reinforced envelope",
        id: 2,
        value: PackagingType.REINFORCED_ENVELOPE,
    },
    { title: "Wooden box", id: 3, value: PackagingType.WOODEN_BOX },
];
const packaging = [
    { title: "Packaging by seller", id: 1, value: "Packaging by seller" },
    {
        title: "Delivery provider",
        id: 2,
        value: "Delivery provider",
    },
];

export const EditOrderShippingDetailPopupComponent = ({
    openPopup,
    closePopup,
    order,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();
    const params = useParams();

    const popupRef = useRef<HTMLDivElement | null>(null);
    useClickOutside(popupRef, () => {
        closePopup();
    });

    const [sellerAddresses, setSellerAddresses] =
        useState<MainAddressGetResponseDto>();
    const [buyerAddresses, setBuyerAddresses] =
        useState<MainAddressGetResponseDto>();

    const [sellerAddress, setSellerAddress] =
        useState<MainAddressGetIdResponseDto>();
    const [buyerAddress, setBuyerAddress] =
        useState<MainAddressGetIdResponseDto>();

    const [changedFields, setChangedFields] = useState<
        | {
              [key: string]:
                  | string
                  | number
                  | ISelectVariant
                  | MainAddressGetIdResponseDto;
          }
        | MainArtworkOrderGetIdResponseDto
    >({});
    const [errorMessages, setErrorMessages] = useState<{
        [key: string]: string | null;
    }>({});

    const addressVariants = (addresses: AddressDto[]): ISelectVariant[] => {
        const newAddressArray = addresses?.map((item) => {
            return {
                title: item.fullname,
                value: item.id.toString(),
            };
        });
        return newAddressArray;
    };

    const onChangeValue = (
        field: string,
        value: string | number | ISelectVariant,
    ) => {
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
            packaging_type: changedFields.packaging_type as PackagingType,
            delivery_operator:
                changedFields.delivery_operator as DeliveryOperator,
            weight: Number(changedFields.weight),
            is_packed_by_me:
                changedFields.is_packed_by_me === "Packaging by seller"
                    ? true
                    : false,
            delivery_tracking_number:
                changedFields.delivery_tracking_number as string,
            address_from_id: sellerAddress?.id,
            address_to_id: buyerAddress?.id,
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

    useEffect(() => {
        apiClient.main.address
            .addressControllerGetAddresses({
                username: order.seller.username,
            })
            .then((response) => {
                setSellerAddresses(response);
            });
        apiClient.main.address
            .addressControllerGetAddresses({
                username: order.buyer.username,
            })
            .then((response) => {
                setBuyerAddresses(response);
            });
    }, []);

    useEffect(() => {
        if (changedFields.address_from) {
            apiClient.main.address
                .addressControllerGetAddressById({
                    id: Number(
                        (changedFields.address_from as ISelectVariant)?.id ||
                            (changedFields.address_from as ISelectVariant)
                                ?.value,
                    ),
                })
                .then((response) => {
                    setSellerAddress(response);
                });
        }
    }, [changedFields.address_from]);

    useEffect(() => {
        if (changedFields.address_to) {
            apiClient.main.address
                .addressControllerGetAddressById({
                    id: Number(
                        (changedFields.address_to as ISelectVariant)?.id ||
                            (changedFields.address_to as ISelectVariant)?.value,
                    ),
                })
                .then((response) => {
                    setBuyerAddress(response);
                });
        }
    }, [changedFields.address_to]);

    return (
        <>
            {openPopup === "edit-order-shipping-detail" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Edit Shipping Details
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
                                htmlFor="ship-method"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Ship Method
                                </div>
                                <SelectOption
                                    placeholder="Deliver provider"
                                    variants={deliveryComp}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue(
                                            "delivery_operator",
                                            (variant as ISelectVariant)!.value,
                                        )
                                    }
                                    activeValue={
                                        changedFields.delivery_operator as string
                                    }
                                    errorMessage={
                                        errorMessages.delivery_operator
                                    }
                                />
                            </label>

                            <label htmlFor="weight" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Weight, KG
                                </div>
                                <Input
                                    className={`${styles.input}`}
                                    placeholder="Type weight in kg"
                                    value={changedFields.weight as number}
                                    disabled={false}
                                    onChange={(e) =>
                                        onChangeValue("weight", e.target.value)
                                    }
                                    errorMessage={errorMessages.weight}
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

                            <label htmlFor="packaging" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Packaging
                                </div>
                                <SelectOption
                                    placeholder="Deliver provider"
                                    variants={packaging}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue(
                                            "is_packed_by_me",
                                            (variant as ISelectVariant)!.value,
                                        )
                                    }
                                    activeValue={
                                        changedFields.is_packed_by_me
                                            ? "Packaging by seller"
                                            : "Deliver provider"
                                    }
                                    errorMessage={
                                        errorMessages.delivery_operator
                                    }
                                />
                            </label>
                            <label
                                htmlFor="packaging-type"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Packaging type
                                </div>
                                <SelectOption
                                    placeholder="Packaging type"
                                    variants={packagingTypes}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue(
                                            "packaging_type",
                                            (variant as ISelectVariant)!.value,
                                        )
                                    }
                                    activeValue={
                                        changedFields.packaging_type
                                            ? (changedFields.packaging_type as string)
                                            : ""
                                    }
                                    errorMessage={errorMessages.packaging_type}
                                />
                            </label>
                            <div className={styles.shippingAddressBlock}>
                                <div className={styles.shipToFrom}>
                                    <div>SHIP TO</div>
                                    <label
                                        htmlFor="ship-to"
                                        className={styles.label}
                                    >
                                        <div className={styles.inputTitle}>
                                            Shipping address
                                        </div>
                                        {buyerAddresses && (
                                            <SelectOption
                                                placeholder="Select address"
                                                variants={addressVariants(
                                                    buyerAddresses.items,
                                                )}
                                                setVariant={(
                                                    variant: SelectOptionType,
                                                ) =>
                                                    onChangeValue(
                                                        "address_to",
                                                        variant as ISelectVariant,
                                                    )
                                                }
                                                activeValue={
                                                    sliceTitle(
                                                        (
                                                            changedFields.address_to as MainAddressGetIdResponseDto
                                                        )?.fullname || "",
                                                        20,
                                                    ) ||
                                                    sliceTitle(
                                                        (
                                                            changedFields.address_to as ISelectVariant
                                                        )?.title || "",
                                                        20,
                                                    )
                                                }
                                                errorMessage={
                                                    errorMessages.packaging_type
                                                }
                                            />
                                        )}
                                    </label>
                                    <div className={styles.blockWrapper}>
                                        {buyerAddress && (
                                            <ShippingAddressBlock
                                                data={buyerAddress}
                                                index={1}
                                                showBtn={false}
                                                showTitle={false}
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className={styles.shipToFrom}>
                                    <div> SHIP FROM</div>
                                    <label
                                        htmlFor="shop-from"
                                        className={styles.label}
                                    >
                                        <div className={styles.inputTitle}>
                                            Shipping address
                                        </div>
                                        {sellerAddresses && (
                                            <SelectOption
                                                placeholder="Select address"
                                                variants={addressVariants(
                                                    sellerAddresses.items,
                                                )}
                                                setVariant={(
                                                    variant: SelectOptionType,
                                                ) =>
                                                    onChangeValue(
                                                        "address_from",
                                                        variant as ISelectVariant,
                                                    )
                                                }
                                                activeValue={
                                                    sliceTitle(
                                                        (
                                                            changedFields.address_from as MainAddressGetIdResponseDto
                                                        )?.fullname || "",
                                                        20,
                                                    ) ||
                                                    sliceTitle(
                                                        (
                                                            changedFields.address_from as ISelectVariant
                                                        )?.title || "",
                                                        20,
                                                    )
                                                }
                                                errorMessage={
                                                    errorMessages.packaging_type
                                                }
                                            />
                                        )}
                                    </label>
                                    {sellerAddress && (
                                        <div className={styles.blockWrapper}>
                                            <ShippingAddressBlock
                                                data={sellerAddress}
                                                index={1}
                                                showBtn={false}
                                                showTitle={false}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
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

const mapState = (state: IReduxProps) => ({
    openPopup: state.openPopup.openPopup,
    orderId: state.openPopup.orderId,
    order: state.order.order,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditOrderShippingDetailPopup = connector(
    EditOrderShippingDetailPopupComponent,
);
