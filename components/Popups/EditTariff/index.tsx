"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditTariffPopupProps } from "./popup.props";
import { DeliveryOperator } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { Selectors } from "./Selectors";

const EditTariffPopupComponent = ({
    closePopup,
}: EditTariffPopupProps): JSX.Element => {
    const router = useRouter();
    const tariffId = Number(useParams().id);

    const [fields, setFields] = useState<{
        id: number;
        operator?: DeliveryOperator;
        price?: number;
        weight?: number;
        countryFromId?: number | undefined;
        countryToId?: number | undefined;
    } | null>(null);

    const discard = () => {
        closePopup();
    };

    const submit = async () => {
        if (!fields || !event) {
            return;
        }

        try {
            await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerUpdate(
                {
                    id: tariffId,
                    requestBody: {
                        operator: fields.operator,
                        price: fields.price ? fields.price * 100 : undefined,
                        weight: fields.weight ? fields.weight : undefined,
                        country_from_id: fields.countryFromId,
                        country_to_id: fields.countryToId,
                    },
                },
            );

            closePopup();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const getTariff = async () => {
        const tariff =
            await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerGetId(
                {
                    id: tariffId,
                },
            );

        setFields({
            id: tariff.id,
            operator: tariff.operator,
            price: tariff.price / 100,
            weight: tariff.weight,
            countryFromId: tariff.country_from
                ? tariff.country_from.id
                : undefined,
            countryToId: tariff.country_to ? tariff.country_to.id : undefined,
        });
    };

    useEffect(() => {
        getTariff();
    }, []);

    if (!fields) {
        return <></>;
    }

    return (
        <>
            <div className={styles.popupBg} onClick={discard}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Delivery Tariff</div>
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
                        operatorDefault={fields.operator}
                        countryFromId={fields.countryFromId}
                        countryToId={fields.countryFromId}
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
                    <div className={styles.error}></div>
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

export const EditTariffPopup = connector(EditTariffPopupComponent);
