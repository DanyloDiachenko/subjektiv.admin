import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { ShippingAddressBlock } from "@/components/UserShippingAddress/ShippingAddressBlock";
import { connect } from "react-redux";
import { IOrderStore } from "@/store/order/initStore";
import { MainArtworkOrderGetIdResponseDto } from "@/submodules/common-dto/api-client/main";

interface IShippingInfo {
    title: string;
    id: number;
    desc: string | number;
}

interface OrderShippingDetailsProps {
    order: MainArtworkOrderGetIdResponseDto;
    setOpenPopup: (popup: string) => void;
}

const ShippingDetailBlock = ({
    order,
    setOpenPopup,
}: OrderShippingDetailsProps) => {
    function transformString(string: string) {
        if (string) {
            const words = string.split(/(?=[A-Z])/);
            words[0] =
                words[0].charAt(0).toUpperCase() +
                words[0].slice(1).toLowerCase();
            for (let i = 1; i < words.length; i++) {
                words[i] = words[i].toLowerCase();
            }

            return words.join(" ");
        } else {
            return "";
        }
    }
    const orderInfo: IShippingInfo[] = [
        /* { title: "Ship Date", id: 2, desc: order.estimated_delivery_date! }, */
        { title: "Ship Method", id: 3, desc: order.delivery_operator },
        {
            title: "Weight",
            id: 4,
            desc: order.weight ? `${order.weight} KGS` : "",
        },

        {
            title: "Packaging",
            id: 6,
            desc: "Deliver provider",
        },
        {
            title: "Packaging type",
            id: 7,
            desc: transformString(order.packaging_type || ""),
        },
        {
            title: "Tracking Number",
            id: 5,
            desc: order.delivery_tracking_number!,
        },
    ];
    return (
        <div className={styles.wrapper} id="shipping-details">
            <div className={styles.titleWrapper}>
                <div className={styles.title}>Shipping details </div>
                <Button
                    appearance="blue"
                    className={styles.editBtn}
                    onClick={() => setOpenPopup("edit-order-shipping-detail")}
                >
                    Edit
                </Button>
            </div>

            <div className={`${styles.wrapperInfo} ${styles.orderInfoBlock}`}>
                {orderInfo.map((item) => (
                    <div className={styles.itemWrapper}>
                        <div className={styles.itemTitle}>{item.title}</div>
                        <div className={styles.itemDesc}>{item.desc}</div>
                    </div>
                ))}
            </div>
            <div className={styles.shippingAddressWrapper}>
                <div>
                    <div className={styles.shippingAddressTitle}>SHIP TO</div>
                    <div
                        className={styles.text}
                    >{`${order.buyer.first_name} ${order.buyer.last_name}`}</div>
                    <ShippingAddressBlock
                        showBtn={false}
                        showTitle={false}
                        data={order.address_to}
                        index={0}
                        className={"orderText"}
                    />
                    <div className={styles.text}>{order.address_to.phone}</div>
                </div>
                <div>
                    <div className={styles.shippingAddressTitle}>SHIP FROM</div>
                    <div
                        className={styles.text}
                    >{`${order.seller.first_name} ${order.seller.last_name}`}</div>
                    <ShippingAddressBlock
                        showBtn={false}
                        data={order.address_from}
                        index={0}
                        showTitle={false}
                        className={"orderText"}
                    />
                    <div className={styles.text}>
                        {order.address_from.phone}
                    </div>
                </div>
                <div>
                    <div className={styles.shippingAddressTitle}>
                        BILLING ADDRESS
                    </div>
                    {order.billing_address && (
                        <>
                            <div className={styles.text}>
                                {order.billing_address.fullname}
                            </div>
                            <ShippingAddressBlock
                                showBtn={false}
                                data={order.billing_address}
                                index={0}
                                showTitle={false}
                                className={"orderText"}
                            />
                            <div className={styles.text}>
                                {order.billing_address.phone}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
const mapState = (state: { order: IOrderStore }) => {
    return {
        order: state.order.order,
    };
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(ShippingDetailBlock);
