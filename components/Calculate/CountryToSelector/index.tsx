"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { CountryToSelectorProps } from "./selector.props";
import { Input } from "@/components/UI/Input";
import { CountryDto } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import useClickOutside from "@/helpers/useClickOutside";

export const CountryToSelector = ({
    countryTo,
    setCountryTo,
}: CountryToSelectorProps): JSX.Element => {
    const selectRef = useRef<HTMLDivElement | null>(null);

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [countries, setCountries] = useState<CountryDto[]>([]);
    const [filteredCountries, setFilteredCountries] = useState<CountryDto[]>(
        [],
    );
    const [countryInput, setCountryInput] = useState<string>("");

    const getCountries = async () => {
        try {
            const response =
                await apiClient.main.countries.countryControllerGetAll({});

            if (response.items) {
                setCountries(response.items);
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

    const onCountryClickHandler = (country: CountryDto) => {
        setCountryTo(country);

        setCountryInput("");
        setIsOpened(false);
    };

    useClickOutside(selectRef, () => setIsOpened(false));

    return (
        <div className={styles.selectWrapper} ref={selectRef}>
            <div
                className={styles.selectContent}
                onClick={() => setIsOpened(!isOpened)}
            >
                {countryTo ? (
                    <span className={styles.activeTitle}>
                        {countryTo.title}
                    </span>
                ) : (
                    <span className={styles.placeholder}>
                        Select Country To
                    </span>
                )}

                <Image
                    src="/media/arrow-select.svg"
                    alt="arrow"
                    width="12"
                    height="8"
                />
            </div>
            {isOpened && (
                <div className={styles.variants}>
                    <Input
                        value={countryInput}
                        onChange={(e) => setCountryInput(e.target.value)}
                        placeholder="Search country"
                    />
                    <ul>
                        {filteredCountries.length ? (
                            filteredCountries.map((country, index) => (
                                <li
                                    key={index}
                                    onClick={() =>
                                        onCountryClickHandler(country)
                                    }
                                >
                                    {country.title}
                                </li>
                            ))
                        ) : (
                            <li>Nothing Found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};
