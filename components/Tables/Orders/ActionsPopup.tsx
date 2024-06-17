import React from "react";
import styles from "./order.module.scss";
import { IRootState } from "@/store";
import { connect } from "react-redux";
interface IActions {
    onClick?: (id: number, popup: string) => void;
    orderId: number;
}
const ActionsPopup = ({ onClick, orderId }: IActions) => {
    const btns = [
        { title: "Edit", id: 1, slug: "edit" },
        { title: "Delete", id: 2, slug: "delete" },
    ];

    const handleClick = (slug: string) => {
        switch (slug) {
            case "edit":
                onClick && onClick(orderId, "edit-order-info");
                break;

            default:
                break;
        }
    };
    return (
        <ul className={styles.actionPopup}>
            {btns.map((btn, index) => (
                <li key={index} onClick={() => handleClick(btn.slug)}>
                    {btn && btn.title}
                </li>
            ))}
        </ul>
    );
};

const mapState = (state: IRootState) => {
    return {
        openPopup: state.openPopup.openPopup,
    };
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(ActionsPopup);
