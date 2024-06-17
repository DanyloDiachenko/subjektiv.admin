"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { NewTariffPopupProps } from "./popup.props";
import { DeliveryOperator } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { Selectors } from "./Selectors";

const NewTariffPopupComponent = ({
    closePopup,
}: NewTariffPopupProps): JSX.Element => {
    const router = useRouter();

    const [fields, setFields] = useState<{
        operator?: DeliveryOperator;
        price?: number;
        weight?: number;
        countryFromId?: number;
        countryToId?: number;
    }>({
        operator: undefined,
        price: undefined,
        weight: undefined,
        countryFromId: undefined,
        countryToId: undefined,
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const discard = () => {
        closePopup();
    };

    const submit = async () => {
        if (
            !fields.operator ||
            !fields.price ||
            !fields.weight ||
            !fields.countryFromId ||
            !fields.countryToId
        ) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        try {
            await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerPost(
                {
                    requestBody: {
                        price: fields.price * 100,
                        operator: fields.operator,
                        weight: fields.weight,
                        country_from_id: fields.countryFromId,
                        country_to_id: fields.countryToId,
                    },
                },
            );

            closePopup();
            router.refresh();
        } catch (error: any) {
            console.log("Error creating tariff", error);
            const responseError = error.response;

            if (responseError.message) {
                setErrorMessage(
                    responseError.message.charAt(0).toUpperCase() +
                        responseError.message.slice(1),
                );
            }
        }
    };

    console.log(fields);

    return (
        <>
            <div className={styles.popupBg} onClick={discard}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Create Delivery Tariff</div>
                    <button className={styles.buttonClose} onClick={discard}>
                        <Image
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    <label htmlFor="price" className={styles.label}>
                        <div className={styles.inputTitle}>Price</div>
                        <Input
                            className={styles.input}
                            placeholder={"Price"}
                            value={fields.price}
                            type="number"
                            onChange={(e) =>
                                setFields({
                                    ...fields,
                                    price: Number(e.target.value),
                                })
                            }
                        />
                    </label>
                    <label htmlFor="weight" className={styles.label}>
                        <div className={styles.inputTitle}>Weight</div>
                        <Input
                            className={styles.input}
                            placeholder={"Weight"}
                            value={fields.weight}
                            type="number"
                            onChange={(e) =>
                                setFields({
                                    ...fields,
                                    weight: Number(e.target.value),
                                })
                            }
                        />
                    </label>
                    <Selectors
                        onCountryFromClick={(country) => {
                            setFields({
                                ...fields,
                                countryFromId: Number(country?.id),
                            });
                        }}
                        onCountryToClick={(country) => {
                            setFields({
                                ...fields,
                                countryToId: Number(country?.id),
                            });
                        }}
                        onOperatorClick={(operator) => {
                            setFields({
                                ...fields,
                                operator: operator?.value as DeliveryOperator,
                            });
                        }}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={styles.error}>{errorMessage}</div>
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

const mapState = () => {};
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const NewDeliveryTariff = connector(NewTariffPopupComponent);
