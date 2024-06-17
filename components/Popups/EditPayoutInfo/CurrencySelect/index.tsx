"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { UserCountrySelectProps } from "./module.props";
import { CurrencyEnum } from "@/submodules/common-dto/api-client/main";
import useClickOutside from "@/helpers/useClickOutside";
import apiClient from "@/api/apiClient";

export const CurrencySelect = ({
    onCurrencySelect,
    activeCurrency,
}: UserCountrySelectProps): JSX.Element => {
    const selectRef = useRef<HTMLDivElement | null>(null);

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [currencies, setCurrencies] = useState<CurrencyEnum[]>([]);

    const onCurrencyClick = (currency: CurrencyEnum) => {
        onCurrencySelect(currency);

        setIsOpened(false);
    };

    useClickOutside(selectRef, () => setIsOpened(false));

    const getCurrencies = async () => {
        try {
            const response =
                await apiClient.main.userPayment.userPaymentControllerGetPayoutCurrencies();

            setCurrencies(response.currencies);

            response.currencies;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCurrencies();
    }, []);

    console.log(currencies);

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                <span>{activeCurrency}</span>
                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <div className={styles.variants}>
                    <ul>
                        {currencies.map((currency, index) => (
                            <li
                                key={index}
                                onClick={() => onCurrencyClick(currency)}
                            >
                                {currency}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
