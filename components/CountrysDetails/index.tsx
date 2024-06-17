"use client";

import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";
import { CountryDetailsProps } from "./module.props";
import Image from "next/image";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";

const CountryDetailsComponent = ({
    country,
    setOpenPopup,
}: CountryDetailsProps) => {
    const router = useRouter();

    const deleteCountry = () => {
        try {
            apiClient.main.countries.countryControllerDeleteCountry({
                id: country.id,
            });

            router.push("/countries");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Details</h2>
                </div>

                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn ${styles.editButton}`}
                        onClick={() => setOpenPopup("editCountry")}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                    <Image
                        src={
                            country.flag_image_id === ""
                                ? imageService.getUrl(
                                      ImageTargetEnum.CountryFlag,
                                      null,
                                      country.flag_image_id || "",
                                      "small",
                                  )
                                : "/media/Empty.png"
                        }
                        alt={country.title}
                        width={50}
                        height={50}
                    />
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>ID</div>
                    <div className={styles.value}>{country.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Title</div>
                    <div className={styles.value}>{country.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>VAT Rate</div>
                    <div className={styles.value}>
                        {country.vat_rate &&
                            `€${(country.vat_rate / 100).toFixed(2)}`}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Operational Fee</div>
                    <div className={styles.value}>
                        {country.operational_fee &&
                            `${country.operational_fee.toFixed(2)}%`}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Short Code</div>
                    <div className={styles.value}>{country.short_code}</div>
                </div>
                <div className={styles.item}>
                    <Button
                        className={styles.button}
                        appearance="red"
                        onClick={deleteCountry}
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

export const CountryDetails = connector(CountryDetailsComponent);
