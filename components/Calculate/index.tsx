"use client";

import { useState } from "react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CalculateTable } from "../Tables/Calculate";
import { ArtworkSelector } from "./ArtworkSelector";
import { CountryFromSelector } from "./CountryFromSelector";
import { CountryToSelector } from "./CountryToSelector";
import styles from "./styles.module.scss";
import { Button } from "../UI/Button";
import {
    ArtworkAdminItemDto,
    CountryDto,
    DeliveryDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { Input } from "../UI/Input";

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Delivery Artwork",
        url: "/delivery-calculate",
    },
    {
        title: "Calculate",
        url: "/delivery-calculate",
    },
];

const Calculate = (): JSX.Element => {
    const [artwork, setArtwork] = useState<null | ArtworkAdminItemDto>(null);
    const [countryFrom, setCountryFrom] = useState<null | CountryDto>(null);
    const [countryTo, setCountryTo] = useState<null | CountryDto>(null);
    const [operatorPriceData, setOperatorPriceData] = useState<DeliveryDto[]>(
        [],
    );
    const [weight, setWeight] = useState<number>();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onCalculateClick = async () => {
        setErrorMessage("");

        if (!countryFrom || !countryTo || !weight || !artwork) {
            setErrorMessage("Please, fill all fields!");
            return;
        }

        try {
            const response =
                await apiClient.main.delivery.deliveryControllerGetAllCheck({
                    requestBody: {
                        country_from_id: countryFrom.id,
                        country_to_id: countryTo.id,
                        artwork_id: artwork.id,
                        weight: weight,
                    },
                });

            setOperatorPriceData(response.data.items);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container  d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Delivery Calculate
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>
                <div className="app-content flex-column-fluid">
                    <div className="app-container">
                        <div className="card">
                            <div
                                className={`card-header border-0 pt-6 ${styles.cardHeader}`}
                            >
                                <div className={styles.selectors}>
                                    <Input
                                        type="number"
                                        value={weight}
                                        onChange={(e) => {
                                            setWeight(Number(e.target.value));
                                        }}
                                        className={styles.input}
                                        placeholder="Weight"
                                    />
                                    <ArtworkSelector
                                        artwork={artwork}
                                        setArtwork={setArtwork}
                                    />
                                    <CountryFromSelector
                                        countryFrom={countryFrom}
                                        setCountryFrom={setCountryFrom}
                                    />
                                    <CountryToSelector
                                        countryTo={countryTo}
                                        setCountryTo={setCountryTo}
                                    />
                                </div>
                                <Button
                                    appearance="blue"
                                    onClick={onCalculateClick}
                                >
                                    Calculate
                                </Button>
                            </div>
                            <div className={styles.error}>{errorMessage}</div>
                            <CalculateTable
                                operatorPriceData={operatorPriceData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calculate;
