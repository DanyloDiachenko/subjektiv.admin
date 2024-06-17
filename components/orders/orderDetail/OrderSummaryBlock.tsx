import styles from "./styles.module.scss";
import Image from "next/image";
import { Button } from "@/components/UI/Button";
import Link from "next/link";
import { IOrderStore } from "@/store/order/initStore";
import { connect } from "react-redux";
import { MainArtworkOrderGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { IRootState } from "@/store";
interface IRedux extends IRootState {
    order: IOrderStore;
}
interface OrderSummaryBlockProps {
    order: MainArtworkOrderGetIdResponseDto;
    setOrderID: (orderID: number) => void;
    setOpenPopup: (popup: string) => void;
}

const OrderSummaryBlock = ({
    order,
    setOrderID,
    setOpenPopup,
}: OrderSummaryBlockProps) => {
    const openEditPopup = () => {
        setOrderID(order.id);
        setOpenPopup("edit-order-summary");
    };

    const summary = [
        {
            title: `Expert comission (${order.expert_get_percent ?? 0}%)`,
            id: 1,
            value: order.expert_get_amount
                ? `${(order.expert_get_amount / 100).toFixed(2)}`
                : "0.00",
            includesInPrice: true,
        },
        {
            title: `Subjectiv comission (${order.system_get_percent ?? 0}%)`,
            id: 2,
            value: order.system_get_amount
                ? `${(order.system_get_amount / 100).toFixed(2)}`
                : "0.00",
            includesInPrice: true,
        },

        // {
        //     title: "Royalties (Expert)",
        //     id: 5,
        //     value: order.expert_get_amount
        //         ? `${(order.expert_get_amount / 100).toFixed(2)} `
        //         : "0",
        //     includesInPrice: true,
        // },
        {
            title: "Royalties (Artist)",
            id: 6,
            value: order.author_get_amount
                ? `${(order.author_get_amount / 100).toFixed(2)}`
                : "0.00",
            includesInPrice: true,
        },
        {
            title: "VAT",
            id: 3,
            value: `${
                order.vat_amount ? (order.vat_amount / 100).toFixed(2) : "0.00"
            }`,
            includesInPrice: true,
        },

        {
            title: "Taxes",
            id: 7,
            value: order.taxes_amount
                ? `${(order.taxes_amount / 100).toFixed(2)}`
                : "0.00",
        },
        {
            title: "Estimated delivery",
            id: 4,
            value: `${
                order.delivery_amount
                    ? (order.delivery_amount / 100).toFixed(2)
                    : "0.00"
            }`,
        },
    ];

    return (
        <div className={styles.wrapper} id="order-summary">
            <div className={styles.titleWrapper}>
                <div className={styles.title}>Order summary</div>
                <Button
                    appearance="blue"
                    className={styles.editBtn}
                    onClick={openEditPopup}
                >
                    Edit
                </Button>
            </div>
            <div
                className={`${styles.wrapperInfo} ${styles.orderSummaryBlock}`}
            >
                <div className={`card-body ${styles.table}`}>
                    <table
                        className={`table align-middle table-row-dashed fs-6 gy-5`}
                    >
                        <tbody className="text-gray-600 fw-semibold">
                            <tr className={styles.borderB}>
                                <td className={styles.artTd}>
                                    <div className={styles.content}>
                                        <Link
                                            href={
                                                "/artworks/" + order.artwork.id
                                            }
                                        >
                                            <Image
                                                src={imageService.getUrl(
                                                    ImageTargetEnum.Artwork,
                                                    {
                                                        artworkId:
                                                            order.artwork.id,
                                                    },
                                                    String(
                                                        order.artwork.main_image
                                                            ?.image_id,
                                                    ),
                                                    "small",
                                                )}
                                                alt="artwork"
                                                width={40}
                                                height={40}
                                            />
                                        </Link>
                                        <div>
                                            <Link
                                                href={
                                                    "/artworks/" +
                                                    order.artwork.id
                                                }
                                                className={styles.linkTitle}
                                            >
                                                {order.artwork.title}
                                            </Link>
                                            <div className={styles.artId}>
                                                Artwork ID: {order.artwork.id}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>Price</td>

                                <td>
                                    €{(order.artwork_price / 100).toFixed(2)}
                                </td>
                            </tr>
                            {summary.map((item) => (
                                <>
                                    <tr>
                                        <td></td>
                                        <td
                                            className={`${
                                                item.includesInPrice
                                                    ? styles.includesInPriceMargin
                                                    : ""
                                            }`}
                                        >
                                            {item.includesInPrice && "-"}
                                            {item.title}
                                        </td>

                                        <td>€{item.value}</td>
                                    </tr>
                                </>
                            ))}

                            <tr>
                                <td></td>

                                <td className={styles.totalTitle}>Total</td>
                                <td className={styles.totalTitle}>
                                    €{(order.total_amount / 100).toFixed(2)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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

export default connector(OrderSummaryBlock);
