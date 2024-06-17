"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "../UI/Button";
import { PayoutInformationProps } from "./module.props";
import styles from "./styles.module.scss";
import { ISelectVariant } from "../UI/Select/variant.interface";
import {
    DocumentsVerificationStatus,
    UserVerificationStatus,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { DocumentVerification } from "./DocumentVerification";
import { PayoutVerification } from "./PayoutVerification";

const verificationStatuses: ISelectVariant[] = [
    {
        title: "Verified",
        value: UserVerificationStatus.VERIFIED,
    },
    {
        title: "Not Verified",
        value: UserVerificationStatus.NOT_VERIFIED,
    },
    {
        title: "Verification Failed",
        value: UserVerificationStatus.VERIFICATION_FAILED,
    },
    {
        title: "In Progress",
        value: UserVerificationStatus.IN_PROGRESS,
    },
];

export const PayoutInformation = ({
    user,
    contentType,
}: PayoutInformationProps): JSX.Element => {
    const router = useRouter();

    const [documentFailedReason, setDocumentFailedReason] = useState<
        null | string
    >(null);
    const [verificationFailedReason, setVerificationFailedReason] = useState<
        null | string
    >(null);
    const [verificationStatus, setVerificationStatus] =
        useState<ISelectVariant>(
            verificationStatuses.find(
                (verifStatus) =>
                    verifStatus?.value === user.verification_status,
            ) || null,
        );
    const [documentVerificationStatus, setDocumentVerificationStatus] =
        useState<ISelectVariant>(
            verificationStatuses.find(
                (verifStatus) =>
                    verifStatus?.value === user.documents_verification_status,
            ) || null,
        );

    const onSave = async () => {
        const verificationStatusValue = verificationStatus
            ? (verificationStatus.value as UserVerificationStatus)
            : undefined;
        const documentsVerificationStatusValue = documentVerificationStatus
            ? (documentVerificationStatus.value as DocumentsVerificationStatus)
            : undefined;
        const documentVerificationFailedReasonValue =
            (documentVerificationStatus && documentVerificationStatus.value) ===
            DocumentsVerificationStatus.VERIFICATION_FAILED
                ? documentFailedReason
                : undefined;
        const verificationFailedReasonValue =
            (verificationStatus && verificationStatus.value) ===
            DocumentsVerificationStatus.VERIFICATION_FAILED
                ? verificationFailedReason
                : undefined;

        try {
            await apiClient.main.adminUser.adminUserControllerUpdateUser({
                username: user.username,
                requestBody: {
                    verification_status: verificationStatusValue,
                    documents_verification_status:
                        documentsVerificationStatusValue,
                    document_verification_failed_reason:
                        documentVerificationFailedReasonValue,
                    verification_failed_reason: verificationFailedReasonValue,
                },
            });

            router.push(`/users/${user.id}`);
            /* location.reload(); */
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <DocumentVerification
                user={user}
                setDocumentVerificationStatus={setDocumentVerificationStatus}
                documentVerificationStatus={documentVerificationStatus}
                verificationStatuses={verificationStatuses}
                documentFailedReason={documentFailedReason}
                setDocumentFailedReason={setDocumentFailedReason}
                contentType={contentType}
            />
            <PayoutVerification
                user={user}
                verificationStatus={verificationStatus}
                setVerificationFailedReason={setVerificationFailedReason}
                verificationFailedReason={verificationFailedReason}
                verificationStatuses={verificationStatuses}
                contentType={contentType}
                setVerificationStatus={setVerificationStatus}
            />
            {contentType === "verifyUser" && (
                <Button
                    appearance="blue"
                    className={styles.buttonSave}
                    onClick={onSave}
                >
                    Save
                </Button>
            )}
        </>
    );
};
