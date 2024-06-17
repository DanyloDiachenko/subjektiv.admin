"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import Pagination from "@/components/UI/Pagination";
import { TariffsTableProps } from "./module.props";
import {
    DeliveryOperator,
    DeliveryTariffDto,
} from "@/submodules/common-dto/api-client/main";
import { Button } from "@/components/UI/Button";
import apiClient from "@/api/apiClient";
import { Select } from "@/components/UI/Select";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { NothingFound } from "@/components/NothingFound";
import { TotalItems } from "@/components/UI/TotalItems";
import { Selectors } from "./Selectors";

const operatorVariants: ISelectVariant[] = [
    {
        title: DeliveryOperator.DHL,
        value: DeliveryOperator.DHL,
    },
    {
        title: DeliveryOperator.MEEST,
        value: DeliveryOperator.MEEST,
    },
    {
        title: DeliveryOperator.NOVA,
        value: DeliveryOperator.NOVA,
    },
    {
        title: DeliveryOperator.UPS,
        value: DeliveryOperator.UPS,
    },
];

const TariffsTableComponent = ({
    tariffsResponse,
    setOpenPopup,
}: TariffsTableProps) => {
    const [tariffs, setTariffs] = useState<DeliveryTariffDto[]>(
        tariffsResponse.items,
    );
    const [currentPage, setCurrentPage] = useState(
        tariffsResponse.current_page,
    );
    const [totalPages, setTotalPages] = useState(tariffsResponse.total_pages);
    const [total, setTotal] = useState(tariffsResponse.total);
    const [operator, setOperator] = useState<ISelectVariant | null>(null);
    const [countryFromId, setCountryFromId] = useState<null | number>(null);
    const [countryToId, setCountryToId] = useState<null | number>(null);

    const getTariffs = async (updatedPage?: number) => {
        try {
            const tariffs =
                await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerGetList(
                    {
                        page: updatedPage ? updatedPage : currentPage,
                        operator:
                            (operator?.value as DeliveryOperator) || undefined,
                        countryFromId: countryFromId || undefined,
                        countryToId: countryToId || undefined,
                    },
                );

            setTariffs(tariffs.items);
            setTotalPages(tariffs.total_pages);
            setTotal(tariffs.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTariffs();
    }, [currentPage]);

    useEffect(() => {
        getTariffs(1);
    }, [operator, countryToId, countryFromId]);

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className={styles.newEventWrapper}>
                    <div className="d-flex align-items-center position-relative my-1">
                        <TotalItems number={total} />
                    </div>
                    <div className={styles.rightColumn}>
                        <Selectors
                            onCountryFromClick={(country) => {
                                setCountryFromId(
                                    (country && country.id) || null,
                                );
                            }}
                            onCountryToClick={(country) => {
                                setCountryToId((country && country.id) || null);
                            }}
                        />
                        <Select
                            variants={operatorVariants}
                            setActiveVariant={setOperator}
                            activeVariant={operator}
                            placeholder="Delivery operator"
                            className={styles.operatorSelect}
                            isRemoveArrow
                        />
                        <Button
                            appearance="blue"
                            className={styles.newEventButton}
                            onClick={() => setOpenPopup("createDeliveryTariff")}
                        >
                            <span className={styles.plus}>
                                <Image
                                    src="/media/plus.svg"
                                    alt="plus"
                                    width="18"
                                    height="18"
                                />
                            </span>
                            <span>New Delivery Tariff</span>
                        </Button>
                    </div>
                </div>
                {tariffs.length ? (
                    <table
                        className={`table align-middle table-row-dashed fs-6 gy-5`}
                    >
                        <thead>
                            <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                                <th>ID</th>
                                <th>PRICE</th>
                                <th>WEIGHT</th>
                                <th>OPERATOR</th>
                                <th>COUNTRY FROM</th>
                                <th>COUNTRY TO</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 fw-semibold">
                            {tariffs.map((tariff, index) => (
                                <tr key={index}>
                                    <td>
                                        <Link
                                            href={
                                                "/delivery-tariffs/" + tariff.id
                                            }
                                            className={styles.linkTitle}
                                        >
                                            {tariff.id}
                                        </Link>
                                    </td>
                                    <td>€{(tariff.price / 100).toFixed(2)}</td>
                                    <td>{tariff.weight}</td>
                                    <td>{tariff.operator}</td>
                                    <td>
                                        {tariff.country_from && (
                                            <Link
                                                href={
                                                    "/countries/" +
                                                    tariff.country_from.id
                                                }
                                                className={styles.linkTitle}
                                            >
                                                {tariff.country_from.title}
                                            </Link>
                                        )}
                                    </td>
                                    <td>
                                        {tariff.country_to && (
                                            <Link
                                                href={
                                                    "/countries/" +
                                                    tariff.country_to.id
                                                }
                                                className={styles.linkTitle}
                                            >
                                                {tariff.country_to.title}
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <NothingFound />
                )}
            </div>
            <div className={styles.bottomContent}>
                <div></div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
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

export const TariffsTable = connector(TariffsTableComponent);
