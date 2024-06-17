import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { IArtworkStore } from "@/store/artwork/initStore";
import { EditExpertReviewPopupProps } from "./popup.props";
import apiClient from "@/api/apiClient";
import { ArtworkReviewStatusUpdateEnum } from "@/submodules/common-dto/api-client/main";

const EditExpertReviewPopupComponent = ({
    artwork,
    closePopup,
}: EditExpertReviewPopupProps) => {
    const router = useRouter();

    const [review, setReview] = useState<string>(
        artwork.review?.description || "",
    );
    const [errorMessage, setErrorMessage] = useState<string>("");

    console.log(artwork.review);

    const submit = async () => {
        if (!artwork.review?.id) {
            return;
        }

        try {
            const response =
                await apiClient.main.artworkReview.artworkReviewControllerPutId(
                    {
                        id: artwork.review?.id,
                        requestBody: {
                            title: artwork.review.title || undefined,
                            description: review,
                            status: returnReviewStatus(),
                        },
                    },
                );
            console.log(response);
            if (response.success && response.data.ok) {
                closePopup();

                router.refresh();
                location.reload();
            } else {
                setErrorMessage("Error");
            }
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    const returnReviewStatus = () => {
        switch (artwork.review?.status) {
            case "published": {
                return ArtworkReviewStatusUpdateEnum.PUBLISHED;
            }
            case "cancelled": {
                return ArtworkReviewStatusUpdateEnum.CANCELLED;
            }
        }

        return undefined;
    };

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Expert Review</div>
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
                    <div className={styles.title}>Review</div>
                    <textarea
                        className={styles.textarea}
                        onChange={(e) => setReview(e.target.value)}
                        value={review}
                    />
                </div>
                <div className={styles.bottom}>
                    <div className={styles.error}>{errorMessage}</div>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={closePopup}>
                            Discard
                        </Button>
                        <Button appearance="blue" onClick={submit}>
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state: { artwork: IArtworkStore }) => ({
    artwork: state.artwork.artwork,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditExpertReviewPopup = connector(EditExpertReviewPopupComponent);
