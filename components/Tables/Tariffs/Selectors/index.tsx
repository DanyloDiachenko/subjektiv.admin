"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { CountriesSelectProps } from "./module.props";
import { Input } from "@/components/UI/Input";
import { CountryDto } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import useClickOutside from "@/helpers/useClickOutside";

export const Selectors = ({
    onCountryFromClick,
    onCountryToClick,
}: CountriesSelectProps): JSX.Element => {
    const selectRefFrom = useRef<HTMLDivElement | null>(null);
    const selectRefTo = useRef<HTMLDivElement | null>(null);

    const [isOpenedFrom, setIsOpenedFrom] = useState<boolean>(false);
    const [isOpenedTo, setIsOpenedTo] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryDto[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryDto[]>(
        [],
    );
    const [countryInput, setCountryInput] = useState<string>("");
    const [activeCountryFrom, setActiveCountryFrom] = useState<string>("");
    const [activeCountryTo, setActiveCountryTo] = useState<string>("");

    const getCountries = async () => {
        try {
            const response =
                await apiClient.main.countries.countryControllerGetAll({
                    page: -1,
                });
            const allCountries = response.items;
            setCountries(allCountries);
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
            <label htmlFor="countryFrom" className={styles.label}>
                <div className={styles.selectWrapper} ref={selectRefFrom}>
                    <div
                        className={styles.selectContent}
                        onClick={() => setIsOpenedFrom(!isOpenedFrom)}
                    >
                        {activeCountryFrom ? (
                            <span>
                                {activeCountryFrom}{" "}
                                <Image
                                    src="/media/close.svg"
                                    alt=""
                                    width="10"
                                    height="10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveCountryFrom("");
                                        onCountryFromClick(null);
                                    }}
                                    className={styles.closeIcon}
                                />
                            </span>
                        ) : (
                            <span className={styles.placeholder}>
                                Country From
                            </span>
                        )}
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
                <div className={styles.selectWrapper} ref={selectRefTo}>
                    <div
                        className={styles.selectContent}
                        onClick={() => setIsOpenedTo(!isOpenedTo)}
                    >
                        {activeCountryTo ? (
                            <span>
                                {activeCountryTo}{" "}
                                <Image
                                    src="/media/close.svg"
                                    alt=""
                                    width="10"
                                    height="10"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveCountryTo("");
                                        onCountryToClick(null);
                                    }}
                                    className={styles.closeIcon}
                                />
                            </span>
                        ) : (
                            <span className={styles.placeholder}>
                                Country From
                            </span>
                        )}
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
