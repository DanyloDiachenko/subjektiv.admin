"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { Select } from "@/components/UI/Select";
import { StatusSelectorProps } from "./statusSelector.props";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    PaymentOperatorEnum,
    PayoutStateEnum,
} from "@/submodules/common-dto/api-client/main";
import styles from "./styles.module.scss";
import apiClient from "@/api/apiClient";
import { Button } from "@/components/UI/Button";

const payoutStatuses: ISelectVariant[] = [
    {
        title: "Accepted",
        value: PayoutStateEnum.ACCEPTED,
    },
    {
        title: "Canceled",
        value: PayoutStateEnum.CANCELLED,
    },
    {
        title: "Created",
        value: PayoutStateEnum.CREATED,
    },
    {
        title: "Rejected",
        value: PayoutStateEnum.REJECTED,
    },
    /* {
        title: "Released",
        value: PayoutStateEnum.RELEASED,
    }, */
];

export const StatusSelector = ({
    payoutStatus,
    targetOperator,
}: StatusSelectorProps) => {
    const payoutId = useParams().id;

    const [status, setStatus] = useState<ISelectVariant>(
        payoutStatuses.find((status) => status?.value === payoutStatus) || null,
    );
    const [errorMessage, setErrorMessage] = useState<string>("");

    const onSelectChange = async (newStatus: ISelectVariant) => {
        setStatus(newStatus);
    };

    const onSave = async () => {
        setErrorMessage("");

        try {
            await apiClient.main.artworkOrder.artworkOrderControllerUpdatePayout(
                {
                    id: Number(payoutId),
                    status: status?.value as PayoutStateEnum,
                },
            );

            location.reload();
        } catch (error: any) {
            const responseError = error.response;

            responseError &&
                responseError.message &&
                setErrorMessage(responseError.message);
        }
    };

    return (
        <>
            <div className={styles.item}>
                <div className={styles.label}>Status</div>
                <div className={styles.value}>
                    {targetOperator !== PaymentOperatorEnum.MANUAL ? (
                        status?.title
                    ) : (
                        <div className={styles.selectWrapper}>
                            <Select
                                activeVariant={status}
                                setActiveVariant={onSelectChange}
                                variants={payoutStatuses}
                                placeholder="Payout status"
                            />
                        </div>
                    )}
                </div>
            </div>
            {targetOperator !== PaymentOperatorEnum.MANUAL ? (
                ""
            ) : (
                <Button
                    appearance="blue"
                    className={styles.submit}
                    onClick={onSave}
                >
                    Save
                </Button>
            )}

            {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </>
    );
};
