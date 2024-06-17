import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { ArtworkOrderStatus } from "@/submodules/common-dto/api-client/main/models/ArtworkOrderStatus";
import apiClient from "@/api/apiClient";
import OrderStatusTransitionMap from "@/submodules/common-dto/constants/orderStatusTransitionMap";
import { formatEnumValue } from "@/helpers/formatEnumValue";

interface IActions {
    orderId: number;
    status: ArtworkOrderStatus;
    setIsActionOpened: () => void;
}

const ActionsOrderPopup = ({
    orderId,
    setIsActionOpened,
    status,
}: IActions) => {
    const router = useRouter();

    const editStatusOrder = (status: ArtworkOrderStatus) => {
        apiClient.main.artworkOrder
            .artworkOrderControllerPutId({
                id: orderId,
                requestBody: { status: status },
            })
            .then(() => {
                router.refresh();
                setIsActionOpened();
            })
            .catch((error: any) => {
                console.log(error);
                setIsActionOpened();
            });
    };

    const handleClick = (status: ArtworkOrderStatus) => {
        editStatusOrder(status);
    };

    const availableStatuses = OrderStatusTransitionMap[status] || [];

    return (
        <ul className={styles.actionPopup}>
            {availableStatuses.map((status, index) => (
                <li key={index} onClick={() => handleClick(status)}>
                    {formatEnumValue(status)}
                </li>
            ))}
        </ul>
    );
};

export default ActionsOrderPopup;
