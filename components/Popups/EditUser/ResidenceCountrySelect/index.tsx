"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { UserCountrySelectProps } from "./module.props";
import { Input } from "@/components/UI/Input";
import { CountryDto } from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import useClickOutside from "@/helpers/useClickOutside";

export const UserResidenceCountrySelect = ({
    onCountryClick,
    activeCountryTitle,
}: UserCountrySelectProps): JSX.Element => {
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
                await apiClient.main.countries.countryControllerGetAll({
                    page: -1,
                });

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
        onCountryClick(country);

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
                <span>{activeCountryTitle}</span>
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
                    />
                    <ul>
                        {filteredCountries.map((country, index) => (
                            <li
                                key={index}
                                onClick={() => onCountryClickHandler(country)}
                            >
                                {country.title}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
