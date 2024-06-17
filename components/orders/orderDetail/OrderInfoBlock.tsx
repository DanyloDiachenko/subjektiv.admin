import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { connect } from "react-redux";
import { IOrderStore } from "@/store/order/initStore";
import {
    ArtworkOrderStatus,
    MainArtworkOrderGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { formatDate } from "@/helpers/formatDate";
import { IRootState } from "@/store";
import { renderOrderStatus } from "@/helpers/renderOrderStatus";
interface IRedux extends IRootState {
    order: IOrderStore;
}

interface IOrderInfo {
    title: string;
    id: number;
    desc: string | React.ReactNode;
    slug?: string;
}
interface OrderInfoBlockProps {
    order: MainArtworkOrderGetIdResponseDto;
    setOpenPopup: (popup: string) => void;
    setOrderID: (orderID: number) => void;
}

const OrderInfoBlock = ({
    order,
    setOpenPopup,
    setOrderID,
}: OrderInfoBlockProps) => {
    const orderInfo: IOrderInfo[] = [
        { title: "Order ID", id: 1, desc: String(order.id) },
        { title: "Order date", id: 2, desc: formatDate(order.created_at) },
        { title: "Order status", id: 3, desc: renderOrderStatus(order.status) },
        {
            title: "Order total",
            id: 4,
            desc: `€${(order.total_amount / 100).toFixed(2)}`,
        },
        { title: "Order weight", id: 5, desc: order.weight },
        {
            title: "Order volumetric weight",
            id: 6,
            desc: order.artwork.volumetric_weight,
        },

        // {
        //     title: "Payment method",
        //     id: 8,
        //     desc: {
        //         icon: '""',
        //         status: '"verified"',
        //         number: '"**** 1273"',
        //     },
        // },
    ];

    const openEditPopup = () => {
        setOrderID(order.id);
        setOpenPopup("edit-order-status");
    };

    return (
        <div className={styles.wrapper} id="order-info">
            <div className={styles.titleWrapper}>
                <div className={styles.title}>
                    {`Order Info #${order.id ?? ""}`}{" "}
                </div>
                {order.status !== ArtworkOrderStatus.COMPLETED &&
                    order.status !== ArtworkOrderStatus.CANCELED && (
                        <Button
                            appearance="blue"
                            className={styles.editBtn}
                            onClick={openEditPopup}
                        >
                            Edit
                        </Button>
                    )}
            </div>

            <div className={`${styles.wrapperInfo} ${styles.orderInfoBlock}`}>
                {orderInfo.map((item) => (
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        {typeof item.desc === "string" ? (
                            <div className={styles.itemDesc}>{item.desc}</div>
                        ) : (
                            <div>{item.desc}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
const mapState = (state: IRedux) => {
    return {
        order: state.order.order,
        openPopup: state.openPopup.openPopup,
    };
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setOrderID: (orderId: number) => ({
        type: "SET_ORDER_ID",
        orderId,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(OrderInfoBlock);
