"use client";

import Link from "next/link";
import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { TariffDetailsProps } from "./module.props";

const TariffDetailsComponent = ({
    tariff,
    setOpenPopup,
}: TariffDetailsProps) => {
    const deleteTariff = () => {
        setOpenPopup("submitDeletePopup");
        /* try {
            apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerDelete(
                {
                    id: tariff.id,
                }
            );

            router.push("/delivery-tariffs");
        } catch (error) {
            console.log(error);
        } */
    };

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Delivery Tariff Details</h2>
                </div>
                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn ${styles.editButton}`}
                        onClick={() => setOpenPopup("editDeliveryTariff")}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>ID</div>
                    <div className={styles.value}>{tariff.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Price</div>
                    <div className={styles.value}>
                        €{(tariff.price / 100).toFixed(2)}
                    </div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Weight</div>
                    <div className={styles.value}>{tariff.weight}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Delivery Operator</div>
                    <div className={styles.value}>{tariff.operator}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Country From</div>
                    <div className={styles.value}>
                        {tariff.country_from && (
                            <Link
                                href={"/countries/" + tariff.country_from.id}
                                className={styles.linkTitle}
                            >
                                {tariff.country_from.title}
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Country To</div>
                    <div className={styles.value}>
                        {tariff.country_to && (
                            <Link
                                href={"/countries/" + tariff.country_to.id}
                                className={styles.linkTitle}
                            >
                                {tariff.country_to.title}
                            </Link>
                        )}
                    </div>
                </div>
                <div className={styles.item}>
                    <Button
                        className={styles.button}
                        appearance="red"
                        onClick={deleteTariff}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const TariffDetails = connector(TariffDetailsComponent);
