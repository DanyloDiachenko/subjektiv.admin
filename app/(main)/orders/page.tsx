import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import OrdersList from "@/components/orders/OrdersList";
import { MainArtworkOrderGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainArtworkOrderGetResponseDto";
import { notFound } from "next/navigation";
import React from "react";

async function getOrders(): Promise<MainArtworkOrderGetResponseDto> {
    try {
        return await apiClient.main.artworkOrder.artworkOrderControllerGetArtworkOrders(
            {},
        );
    } catch (error) {
        console.log("error-getNotifications", error);

        return notFound();
    }
}
const OrdersPage = async () => {
    apiClientServerInit();

    const orders = await getOrders();

    return (
        <OrdersList
            ordersAll={orders.items}
            total_pages={orders.total_pages}
            totalDefault={orders.total}
        />
    );
};

export default OrdersPage;
