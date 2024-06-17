"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { CountriesSelectProps } from "./module.props";
import { Input } from "@/components/UI/Input";
import {
    CountryDto,
    DeliveryOperator,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import useClickOutside from "@/helpers/useClickOutside";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import { Select } from "@/components/UI/Select";

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

export const Selectors = ({
    onCountryFromClick,
    onCountryToClick,
    countryToId,
    countryFromId,
    operatorDefault,
    onOperatorClick,
}: CountriesSelectProps): JSX.Element => {
    const selectRefFrom = useRef<HTMLDivElement | null>(null);
    const selectRefTo = useRef<HTMLDivElement | null>(null);

    const [operator, setOperator] = useState<ISelectVariant | null>(
        operatorVariants.find(
            (operator) => operator?.value === operatorDefault,
        ) || null,
    );
    const [isOpenedFrom, setIsOpenedFrom] = useState<boolean>(false);
    const [isOpenedTo, setIsOpenedTo] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryDto[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryDto[]>(
        [],
    );
    const [countryInput, setCountryInput] = useState<string>("");
    const [activeCountryFrom, setActiveCountryFrom] = useState<string>("");
    const [activeCountryTo, setActiveCountryTo] = useState<string>("");

    const onOperatorClickHandler = (operator: ISelectVariant) => {
        setOperator(operator);
        onOperatorClick(operator);
    };

    const getCountries = async () => {
        try {
            const response =
                await apiClient.main.countries.countryControllerGetAll({
                    page: -1,
                });
            const allCountries = response.items;
            setCountries(allCountries);

            if (countryFromId) {
                setActiveCountryFrom(
                    allCountries.find((country) => country.id === countryFromId)
                        ?.title || "",
                );
            }
            if (countryToId) {
                setActiveCountryTo(
                    allCountries.find((country) => country.id === countryToId)
                        ?.title || "",
                );
            }
        } catch (error) {
            console.log("catch error getting countries", error);
        }
    };

    useEffect(() => {
        getCountries();
    }, []);

    const handleSearch = () => {
        let countriesCopy: CountryDto[] = countries;

        if (countryInput) {
            countriesCopy = countriesCopy.filter((country: CountryDto) =>
                country.title
                    .toLowerCase()
                    .includes(countryInput.toLowerCase()),
            );
        }

        setFilteredCountries(countriesCopy);
    };

    useEffect(() => {
        setFilteredCountries(countries);
    }, [countries]);

    useEffect(() => {
        handleSearch();
    }, [countryInput]);

    const onCountryFromClickHandler = (country: CountryDto) => {
        onCountryFromClick(country);

        setActiveCountryFrom(
            countries.find((countryy) => countryy.id === country.id)?.title ||
                "",
        );

        setCountryInput("");
        setIsOpenedFrom(false);
    };

    const onCountryToClickHandler = (country: CountryDto) => {
        onCountryToClick(country);

        setActiveCountryTo(
            countries.find((countryy) => countryy.id === country.id)?.title ||
                "",
        );

        setCountryInput("");
        setIsOpenedTo(false);
    };

    useClickOutside(selectRefFrom, () => setIsOpenedFrom(false));
    useClickOutside(selectRefTo, () => setIsOpenedTo(false));

    return (
        <>
            <label htmlFor="operator" className={styles.label}>
                <div className={styles.inputTitle}>Delivery Operator</div>
                <Select
                    variants={operatorVariants}
                    activeVariant={operator}
                    setActiveVariant={onOperatorClickHandler}
                    placeholder="Delivery operator"
                    className={styles.select}
                    isRemoveArrow={false}
                />
            </label>
            <label htmlFor="countryFrom" className={styles.label}>
                <div className={styles.inputTitle}>Country From</div>
                <div className={styles.selectWrapper} ref={selectRefFrom}>
                    <div
                        className={styles.selectContent}
                        onClick={() => setIsOpenedFrom(!isOpenedFrom)}
                    >
                        <span>{activeCountryFrom}</span>
                        <Image
                            src="/media/arrow-select.svg"
                            alt="arrow"
                            width="12"
                            height="8"
                        />
                    </div>
                    {isOpenedFrom && (
                        <div className={styles.variants}>
                            <Input
                                value={countryInput}
                                onChange={(e) =>
                                    setCountryInput(e.target.value)
                                }
                            />
                            <ul>
                                {filteredCountries.map((country, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            onCountryFromClickHandler(country)
                                        }
                                    >
                                        {country.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </label>
            <label htmlFor="countryTo" className={styles.label}>
                <div className={styles.inputTitle}>Country To</div>
                <div className={styles.selectWrapper} ref={selectRefTo}>
                    <div
                        className={styles.selectContent}
                        onClick={() => setIsOpenedTo(!isOpenedTo)}
                    >
                        <span>{activeCountryTo}</span>
                        <Image
                            src="/media/arrow-select.svg"
                            alt="arrow"
                            width="12"
                            height="8"
                        />
                    </div>
                    {isOpenedTo && (
                        <div className={styles.variants}>
                            <Input
                                value={countryInput}
                                onChange={(e) =>
                                    setCountryInput(e.target.value)
                                }
                            />
                            <ul>
                                {filteredCountries.map((country, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            onCountryToClickHandler(country)
                                        }
                                    >
                                        {country.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </label>
        </>
    );
};
