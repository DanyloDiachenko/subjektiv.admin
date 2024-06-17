"use client";

import React, { useEffect, useState } from "react";

import { Breadcrumbs } from "../Breadcrumbs";
import Image from "next/image";
import { ISelectVariant } from "../UI/Select/variant.interface";
import OrdersTable from "../Tables/Orders";
import OrdersListSelector from "./OrderListSelector";
import {
    ArtworkOrderItemDto,
    ArtworkOrderSortingFields,
    ArtworkOrderStatus,
    SortOrder,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { TotalItems } from "../UI/TotalItems";

interface OrdersListProps {
    ordersAll: ArtworkOrderItemDto[];
    total_pages: number;
    totalDefault: number;
}

const ordersQuantityPerPageVariants: ISelectVariant[] = [
    {
        title: "10",
        value: "10",
    },
    {
        title: "20",
        value: "20",
    },
    {
        title: "50",
        value: "50",
    },
    {
        title: "100",
        value: "100",
    },
];

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
];

const OrdersList = ({
    ordersAll,
    total_pages,
    totalDefault,
}: OrdersListProps) => {
    const [ordersQuantityPerPage, setOrdersQuantityPerPage] =
        useState<ISelectVariant>(ordersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(total_pages);
    const [total, setTotal] = useState<number>(totalDefault);
    const [ordersStatus, setOrdersStatus] = useState<ISelectVariant | null>(
        null,
    );
    const [deliveryOperator, setDeliveryOperator] =
        useState<ISelectVariant | null>(null);
    const [searchOrder, setSearchOrder] = useState<string>("");
    const [orders, setOrders] = useState<ArtworkOrderItemDto[]>(ordersAll);

    const returnOrderStatus = () => {
        switch (ordersStatus?.value) {
            case "pending":
                return ArtworkOrderStatus.PENDING;
            case "paid":
                return ArtworkOrderStatus.PAID;
            case "delivering":
                return ArtworkOrderStatus.DELIVERING;
            case "canceled":
                return ArtworkOrderStatus.CANCELED;
            case "completed":
                return ArtworkOrderStatus.COMPLETED;
            case "payouts_proceed":
                return ArtworkOrderStatus.PAYOUTS_PROCEED;

            default:
                return undefined;
        }
    };

    const getOrders = async (
        sortField?: ArtworkOrderSortingFields,
        sortOrder?: SortOrder,
        updatedPage?: number,
    ) => {
        try {
            const status = returnOrderStatus();

            const response =
                await apiClient.main.artworkOrder.artworkOrderControllerGetArtworkOrders(
                    {
                        page: updatedPage ? updatedPage : currentPage,
                        statuses: status !== undefined ? [status] : undefined,
                        search: searchOrder.length ? searchOrder : undefined,
                        sortField: sortField,
                        sortOrder: sortOrder,
                    },
                );

            setOrders(response.items);
            setTotalPages(response.total_pages);
            setTotal(response.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getOrders(undefined, undefined, 1);
    }, [searchOrder, ordersQuantityPerPage, ordersStatus, ordersAll]);

    useEffect(() => {
        getOrders();
    }, [currentPage]);

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            Orders Listing
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container ">
                    <div className="card">
                        <div className="card-header border-0 pt-6">
                            <div className="card-title">
                                <div className="d-flex align-items-center position-relative my-1">
                                    <Image
                                        className="position-absolute ms-5"
                                        src="/media/search.svg"
                                        alt="search"
                                        width={14}
                                        height={18}
                                    />
                                    <input
                                        type="text"
                                        className="form-control form-control-solid w-250px ps-13"
                                        placeholder="Search"
                                        value={searchOrder}
                                        onChange={(e) =>
                                            setSearchOrder(e.target.value)
                                        }
                                    />
                                    <TotalItems number={total} />
                                </div>
                            </div>
                            <OrdersListSelector
                                activeVariant={ordersStatus}
                                setActiveVariant={setOrdersStatus}
                                deliveryOperator={deliveryOperator}
                                setDeliveryOperator={setDeliveryOperator}
                            />
                        </div>

                        <OrdersTable
                            orders={orders}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            totalPages={totalPages}
                            ordersQuantityPerPage={ordersQuantityPerPage}
                            ordersQuantityPerPageVariants={
                                ordersQuantityPerPageVariants
                            }
                            setOrdersQuantityPerPage={setOrdersQuantityPerPage}
                            onThClick={getOrders}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersList;
