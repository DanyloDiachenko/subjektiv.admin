import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import OneOrderPage from "@/components/orders/OneOrderPage";

interface OrderPageProps {
    params: {
        id: string;
    };
}

async function getOrder(
    id: string,
) /* : Promise<MainArtworkOrderGetIdResponseDto> */ {
    try {
        return await apiClient.main.artworkOrder.artworkOrderControllerGetById({
            id: Number(id),
        });
    } catch (error) {
        console.log("error", error);

        /*return notFound(); */
    }
}

const OrderDetailsPage = async ({
    params: { id },
}: OrderPageProps): Promise<JSX.Element> => {
    apiClientServerInit();

    const order = await getOrder(id);

    if (!order) {
        return <></>;
    }

    return <OneOrderPage order={order} />;
};

export default OrderDetailsPage;
