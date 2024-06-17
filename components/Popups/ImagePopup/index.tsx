"use client";

import Image from "next/image";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { EditUserPopupProps } from "./popup.props";
import { IRootState } from "@/store";

export const ImagePopupComponent = ({
    closePopup,
    imagePopupSrc,
}: EditUserPopupProps): JSX.Element => {
    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Image Details</div>
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
                    <img src={imagePopupSrc} alt="image details" />
                </div>
            </div>
        </>
    );
};

const mapState = (state: IRootState) => ({
    imagePopupSrc: state.imagePopup.imageSrc,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const ImagePopup = connector(ImagePopupComponent);
