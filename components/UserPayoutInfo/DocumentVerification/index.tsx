import { connect } from "react-redux";
import styles from "./styles.module.scss";
import { DocumentVerificationProps } from "./module.props";
import { useEffect, useState } from "react";
import { formatEnumValue } from "@/helpers/formatEnumValue";
import { Select } from "@/components/UI/Select";
import { getCookie } from "@/api/cookies";
import { DocumentsVerificationStatus } from "@/submodules/common-dto/api-client/main";

const failureReasons = [
    {
        id: 1,
        value: "unreadable_info",
        label: "We could not read the information from the documents",
    },
    {
        id: 2,
        value: "suspicious_documents",
        label: "We consider these documents suspicious",
    },
    {
        id: 3,
        value: "missing_documents",
        label: "There are no necessary documents in these photos",
    },
];

const DocumentVerificationComponent = ({
    user,
    setImagePopup,
    setOpenPopup,
    documentVerificationStatus,
    setDocumentVerificationStatus,
    verificationStatuses,
    setDocumentFailedReason,
    documentFailedReason,
    contentType,
}: DocumentVerificationProps) => {
    const [documentFront, setDocumentFront] = useState<string>("");
    const [documentBack, setDocumentBack] = useState<string>("");

    const fetchImage = async (
        documentSide: "front" | "back",
        setImage: (imageSrc: string) => void,
    ) => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STORAGE_URL}/storage/private?path=${
                    user.id
                }/documents/${
                    documentSide === "front"
                        ? user.document_front_image_id
                        : user.document_back_image_id
                }_full.jpeg`,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie("token")}`,
                    },
                },
            );
            const imageBlob = await response.blob();
            setImage(URL.createObjectURL(imageBlob));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchImage("front", setDocumentFront);
        fetchImage("back", setDocumentBack);
    }, []);

    return (
        <div
            className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}
            id="document-verification"
        >
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Document Verification</h2>
                </div>
                <div className="card-toolbar"></div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div>
                    <div>
                        <div className={styles.images}>
                            <div className={styles.imageItem}>
                                <div className={styles.title}>
                                    DOCUMENT FRONT
                                </div>
                                {documentFront &&
                                user.document_front_image_id ? (
                                    <img
                                        src={documentFront}
                                        alt="user document image"
                                        onClick={() => {
                                            setImagePopup(documentFront);
                                            setOpenPopup("imagePopup");
                                        }}
                                    />
                                ) : (
                                    "-"
                                )}
                            </div>
                            <div className={styles.imageItem}>
                                <div className={styles.title}>
                                    DOCUMENT BACK
                                </div>
                                {documentBack && user.document_back_image_id ? (
                                    <img
                                        src={documentBack}
                                        alt="user document image"
                                        onClick={() => {
                                            setImagePopup(documentBack);
                                            setOpenPopup("imagePopup");
                                        }}
                                    />
                                ) : (
                                    "-"
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Residence Country</div>
                        <div className={styles.value}>
                            {user.residence_country?.title}
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Vat Number</div>
                        <div className={styles.value}>{user.vat_number}</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Document Type</div>
                        <div className={styles.value}>
                            {formatEnumValue(user.document_type || "")}
                        </div>
                    </div>
                    <>
                        {contentType === "verifyUser" && (
                            <>
                                <div className={styles.item}>
                                    <div className={styles.label}>
                                        Document Verification Status
                                    </div>
                                    <div className={styles.value}>
                                        <div className={styles.selectWrapper}>
                                            <Select
                                                activeVariant={
                                                    documentVerificationStatus
                                                }
                                                setActiveVariant={
                                                    setDocumentVerificationStatus
                                                }
                                                variants={verificationStatuses}
                                                placeholder=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {documentVerificationStatus?.value ===
                            DocumentsVerificationStatus.VERIFICATION_FAILED && (
                            <div className={styles.item}>
                                <div className={styles.label}>Fail Reason</div>
                                <div className={styles.value}>
                                    {failureReasons.map((reason) => (
                                        <label
                                            key={reason.id}
                                            className={styles.failReason}
                                        >
                                            <input
                                                type="radio"
                                                name="docsFailReason"
                                                value={reason.value}
                                                onChange={() =>
                                                    setDocumentFailedReason(
                                                        reason.value,
                                                    )
                                                }
                                                checked={
                                                    documentFailedReason ===
                                                    reason.value
                                                }
                                            />
                                            <span>{reason.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
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
    setImagePopup: (imageSrc: string) => ({
        type: "SET_IMAGE_POPUP",
        imageSrc,
    }),
};

const connector = connect(mapState, mapDispatch);

export const DocumentVerification = connector(DocumentVerificationComponent);
