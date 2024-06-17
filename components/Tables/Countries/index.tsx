"use client";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import Pagination from "@/components/UI/Pagination";
import { CountriesTableProps } from "./module.props";
import { CountryDto } from "@/submodules/common-dto/api-client/main";
import { Button } from "@/components/UI/Button";
import Image from "next/image";
import Link from "next/link";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import apiClient from "@/api/apiClient";
import { TotalItems } from "@/components/UI/TotalItems";

const CountriesTableComponent = ({
    countriesResponse,
    setOpenPopup,
}: CountriesTableProps) => {
    const [countries, setCountries] = useState<CountryDto[]>(
        countriesResponse.items,
    );
    const [currentPage, setCurrentPage] = useState(
        countriesResponse.current_page,
    );
    const [totalPages, setTotalPages] = useState(countriesResponse.total_pages);
    const [total, setTotal] = useState(countriesResponse.total);

    const returnCountryFlag = (imageId: string | null) => {
        if (imageId) {
            return imageService.getUrl(
                ImageTargetEnum.CountryFlag,
                null,
                imageId,
                "medium",
            );
        }

        return "/media/no-avatar.png";
    };

    const getCountries = async () => {
        try {
            const countries =
                await apiClient.main.countries.countryControllerGetAll({
                    page: currentPage,
                });

            setCountries(countries.items);
            setTotalPages(countries.total_pages);
            setTotal(countries.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCountries();
    }, [currentPage]);

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className={styles.newCountryWrapper}>
                    <TotalItems number={total} />
                    <Button
                        appearance="blue"
                        className={styles.newCountryButton}
                        onClick={() => setOpenPopup("newCountry")}
                    >
                        <span className={styles.plus}>
                            <Image
                                src="/media/plus.svg"
                                alt="plus"
                                width="18"
                                height="18"
                            />
                        </span>
                        <span>New Country</span>
                    </Button>
                </div>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thCountryId}>ID</th>
                            <th className={styles.thCountryTitle}>TITLE</th>
                            <th className={styles.thCountryFlag}>FLAG</th>
                            <th>SHORT CODE</th>
                            <th>OPERATIONAL FEE</th>
                            <th>TAX RATE</th>
                            <th>VAT RATE</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {countries.map((country, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        href={"/countries/" + country.id}
                                        className={styles.linkTitle}
                                    >
                                        {country.id}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        href={"/countries/" + country.id}
                                        className={styles.linkTitle}
                                    >
                                        {country.title}
                                    </Link>
                                </td>
                                <td>
                                    <img
                                        src={returnCountryFlag(
                                            country.flag_image_id,
                                        )}
                                        alt={country.title}
                                        width={40}
                                        height={40}
                                        style={{
                                            background: "#393945",
                                            borderRadius: "50%",
                                        }}
                                    />
                                </td>
                                <td>{country.short_code}</td>
                                <td>{country.operational_fee?.toFixed(2)}%</td>
                                <td>
                                    €
                                    {country.tax_rate &&
                                        (country.tax_rate / 100).toFixed(2)}
                                </td>
                                <td>
                                    €
                                    {country.vat_rate &&
                                        (country.vat_rate / 100).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export const CountriesTable = connector(CountriesTableComponent);
