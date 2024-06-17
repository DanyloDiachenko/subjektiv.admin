import styles from "./styles.module.scss";
import Image from "next/image";
import { Select } from "../UI/Select";
import { Button } from "../UI/Button";
import { ISelectVariant } from "../UI/Select/variant.interface";
import { ArtworkOrderStatus } from "@/submodules/common-dto/api-client/main/models/ArtworkOrderStatus";

const statuses: ISelectVariant[] = [
    { title: "Completed", value: ArtworkOrderStatus.COMPLETED },
    { title: "Canceled", value: ArtworkOrderStatus.CANCELED },
    { title: "Order placed", value: ArtworkOrderStatus.PAID },
    { title: "Delivering", value: ArtworkOrderStatus.DELIVERING },
    { title: "New", value: ArtworkOrderStatus.PENDING },
    { title: "Payouts proceed", value: ArtworkOrderStatus.PAYOUTS_PROCEED },
];

interface OrdersListSelectorProps {
    activeVariant: ISelectVariant;
    setActiveVariant: (activeVariant: ISelectVariant) => void;
    deliveryOperator: ISelectVariant;
    setDeliveryOperator: (activeVariant: ISelectVariant) => void;
}

const OrdersListSelector = ({
    activeVariant,
    setActiveVariant,
}: OrdersListSelectorProps) => {
    return (
        <div className="card-toolbar">
            <div className={`d-flex justify-content-end ${styles.wrapper}`}>
                <Select
                    placeholder="Order status"
                    activeVariant={activeVariant}
                    setActiveVariant={setActiveVariant}
                    variants={statuses}
                    className={styles.role}
                />
                {/* <Select
                    placeholder="Delivery operator"
                    activeVariant={deliveryOperator}
                    setActiveVariant={setDeliveryOperator}
                    variants={operators}
                    className={styles.operator}
                /> */}
                <div className="w-200px">
                    <Button appearance="blue" className={styles.newUserButton}>
                        <span className={styles.plus}>
                            <Image
                                src="/media/plus.svg"
                                alt="plus"
                                width="18"
                                height="18"
                            />
                        </span>
                        <span>Create New Order</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OrdersListSelector;
