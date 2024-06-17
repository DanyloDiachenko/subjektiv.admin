"use client";

import Image from "next/image";
import { Button } from "../../UI/Button";
import styles from "./general.module.scss";
import { connect } from "react-redux";
import { storage } from "@/helpers/storage";

interface IButton {
    setOpenPopup: (popup: string) => void;
    page?: string;
}

const AddGeneralBtnComponent = ({
    setOpenPopup,
    page,
}: IButton): JSX.Element => {
    console.log(page);

    return (
        <div className={`d-flex justify-content-end ${styles.wrapper}`}>
            <Button
                appearance="blue"
                className={styles.newUserButton}
                onClick={() => {
                    setOpenPopup("addGeneral");
                    storage.setItem("page", page);
                }}
            >
                <span className={styles.plus}>
                    <Image
                        src="/media/plus.svg"
                        alt="plus"
                        width="18"
                        height="18"
                    />
                </span>
                <span>New {page === "keywords" ? "keyword" : page}</span>
            </Button>
        </div>
    );
};
const mapState = () => ({});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const AddGeneralBtn = connector(AddGeneralBtnComponent);
