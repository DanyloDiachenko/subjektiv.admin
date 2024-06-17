"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import { IPopupStore } from "@/store/popup/initStore";
import { IPayoutInfoStore } from "@/store/payoutInfo/initStore";
import { CurrencySelect } from "./CurrencySelect";
import apiClient from "@/api/apiClient";
import { CurrencyEnum } from "@/submodules/common-dto/api-client/main";

export const EditPayoutInfoPopupComponent = ({
    closePopup,
    payoutInfo,
}: EditUserPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();

    const [fields, setFields] = useState(payoutInfo);

    useClickOutside(popupRef, () => {
        closePopup();
    });

    const setFieldsHandler = (field: string, value: string) => {
        setFields({
            ...fields,
            [field]: value,
        });
    };

    const submitPatchUser = async () => {
        if (!fields) {
            return;
        }

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerUpdateUser({
                    username: fields.username,
                    requestBody: {
                        ...fields,
                        currency: fields.currency as CurrencyEnum,
                    },
                });

            if (response.success && response.data.ok) {
                router.refresh();
                closePopup();
            } else {
            }
        } catch (error) {
            console.log(error);
        }
    };

    const discard = () => {
        closePopup();
    };

    console.log(fields);

    if (!fields) {
        return <></>;
    }

    return (
        <>
            <div className={styles.popupBg}></div>
            <div className={styles.popup} ref={popupRef}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Payout Info</div>
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
                    <label htmlFor="userCurrency" className={styles.label}>
                        <div className={styles.inputTitle}>User currency</div>
                        <CurrencySelect
                            activeCurrency={fields.currency}
                            onCurrencySelect={(currency) =>
                                setFieldsHandler("currency", currency)
                            }
                        />
                    </label>
                    <label htmlFor="userIban" className={styles.label}>
                        <div className={styles.inputTitle}>User IBAN</div>
                        <Input
                            className={styles.input}
                            placeholder="User IBAN"
                            name="userIban"
                            value={fields.iban || ""}
                            onChange={(e) =>
                                setFieldsHandler("iban", e.target.value)
                            }
                        />
                    </label>
                    <label htmlFor="userSwift" className={styles.label}>
                        <div className={styles.inputTitle}>User Swift</div>
                        <Input
                            className={styles.input}
                            placeholder="User Swift"
                            name="userSwift"
                            value={fields.swift || ""}
                            onChange={(e) =>
                                setFieldsHandler("swift", e.target.value)
                            }
                        />
                    </label>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.error}></div>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={discard}>
                            Discard
                        </Button>
                        <Button appearance="blue" onClick={submitPatchUser}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state: {
    openPopup: IPopupStore;
    payoutInfo: { payoutInfo: IPayoutInfoStore };
}) => ({
    openPopup: state.openPopup.openPopup,
    payoutInfo: state.payoutInfo.payoutInfo,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditPayoutInfoPopup = connector(EditPayoutInfoPopupComponent);
