"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { MainCountriesPutIdRequestDto } from "@/submodules/common-dto/api-client/main";

export const EditCountryPopupComponent = ({
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const countryId = Number(useParams().id);

    const [changedFields, setChangedFields] =
        useState<MainCountriesPutIdRequestDto | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getCountry = async () => {
        try {
            const response =
                await apiClient.main.countries.countryControllerGetCountry({
                    id: countryId,
                });

            setChangedFields({
                title: response.title,
                vat_rate: response.vat_rate || undefined,
                short_code: response.short_code || undefined,
                operational_fee: response.operational_fee || undefined,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const submit = async () => {
        if (!changedFields) {
            return;
        }

        try {
            await apiClient.main.countries.countryControllerUpdateCountry({
                id: countryId,
                requestBody: changedFields,
            });
        } catch (error: any) {
            console.log("Error editing country", error);
            const responseError = error.response;
            console.log(responseError);

            if (responseError.message) {
                setErrorMessage(
                    responseError.message.charAt(0).toUpperCase() +
                        responseError.message.slice(1),
                );
            }
        }
    };

    const discard = () => {
        setChangedFields(null);
        closePopup();
    };

    useEffect(() => {
        getCountry();
    }, []);

    if (!changedFields) {
        return <></>;
    }

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Country</div>
                    <button className={styles.buttonClose} onClick={closePopup}>
                        <Image
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    {/* <SingleImage
                        kind={ImageKindEnum.GENERAL}
                        imageId={generalData.image_id}
                        place={page}
                        setChangedFields={setChangedFields}
                        changedFields={changedFields}
                    /> */}
                    <label htmlFor="title" className={styles.label}>
                        <div className={styles.inputTitle}>Title</div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.title}
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    title: e.target.value,
                                });
                            }}
                        />
                    </label>
                    <label htmlFor="shortCode" className={styles.label}>
                        <div className={styles.inputTitle}>Short code</div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.short_code || ""}
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    short_code: e.target.value,
                                });
                            }}
                        />
                    </label>
                    <label htmlFor="vatRate" className={styles.label}>
                        <div className={styles.inputTitle}>Vat rate</div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.vat_rate || ""}
                            type="number"
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    vat_rate: Number(e.target.value),
                                });
                            }}
                        />
                    </label>
                    <label htmlFor="operationalFee" className={styles.label}>
                        <div className={styles.inputTitle}>
                            Operational Feee
                        </div>
                        <Input
                            className={styles.input}
                            defaultValue={changedFields.operational_fee || ""}
                            type="number"
                            onChange={(e) => {
                                setChangedFields({
                                    ...changedFields,
                                    operational_fee: Number(e.target.value),
                                });
                            }}
                        />
                    </label>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.error}>{errorMessage}</div>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={discard}>
                            Discard
                        </Button>
                        <Button appearance="blue" onClick={submit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = () => ({});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditCountryPopup = connector(EditCountryPopupComponent);
