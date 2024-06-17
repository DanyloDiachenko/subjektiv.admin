"use client";

import { connect } from "react-redux";

import { MainArtworkOrderGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import { Breadcrumbs } from "../Breadcrumbs";
import { Navbar } from "../Navbar";
import { ITab } from "../Navbar/tab.interface";
import OrderInfoBlock from "./orderDetail/OrderInfoBlock";
import OrderSummaryBlock from "./orderDetail/OrderSummaryBlock";

import ShippingDetailBlock from "./orderDetail/ShippingDetailBlock";
import { OrderHistoryBlock } from "./orderDetail/OrderHistoryBlock";
import { OrderPaymentDetailsBlock } from "./orderDetail/OrderPaymentDetailsBlock";
import UsersArtistOwnerExpertBlock from "../UsersArtistOwnerExpertBlock";

interface OneOrderPageProps {
    order: MainArtworkOrderGetIdResponseDto;
    setOrder: (order: MainArtworkOrderGetIdResponseDto) => void;
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Orders Workspace",
        url: "/orders",
    },
    {
        title: "Orders Listing",
        url: "/orders",
    },
    {
        title: "Order Details",
        url: "#",
    },
];

const OneOrderPage = ({ order, setOrder }: OneOrderPageProps) => {
    const tabs: ITab[] = [
        {
            title: "Order Info",
            link: "order-info",
        },
        {
            title: "Order Summary",
            link: "order-summary",
        },
        {
            title: "Shipping Details",
            link: "shipping-details",
        },
        {
            title: "Order History",
            link: "order-history",
        },
        {
            title: "Payment Details",
            link: "payment-details",
        },
    ];

    if (order.id) {
        setOrder(order);
    }

    console.log(order);

    return (
        <>
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            Order Details
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>
            <div className="app-content flex-column-fluid">
                <div className="app-container ">
                    <div className="d-flex flex-column flex-xl-row">
                        <div className="flex-column flex-lg-row-auto  mb-10">
                            <div className="w-100">
                                <UsersArtistOwnerExpertBlock
                                    owner={order.seller}
                                    buyer={order.buyer}
                                    expert={order.expert ?? undefined}
                                />
                            </div>
                        </div>

                        <div className="flex-lg-row-fluid ms-4">
                            <Navbar tabs={tabs} />

                            <div className="tab-content">
                                <div
                                    className="tab-pane active"
                                    role="tabpanel"
                                >
                                    <OrderInfoBlock />
                                    <OrderSummaryBlock />
                                    <ShippingDetailBlock />
                                    <OrderHistoryBlock />
                                    <OrderPaymentDetailsBlock />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = () => {
    return {};
};
const mapDispatch = {
    setOrder: (order: MainArtworkOrderGetIdResponseDto) => ({
        type: "SET_ORDER",
        order,
    }),
};
const connector = connect(mapState, mapDispatch);

export default connector(OneOrderPage);
