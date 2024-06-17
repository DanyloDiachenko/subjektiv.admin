import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { PayoutsPage } from "@/components/Payouts";
import { MainArtworkOrderGetPayoutsResponseDto } from "@/submodules/common-dto/api-client/main";

async function getPayouts(): Promise<MainArtworkOrderGetPayoutsResponseDto> {
    try {
        return await apiClient.main.artworkOrder.artworkOrderControllerGetPayouts(
            {},
        );
    } catch (error) {
        console.log(error);

        return {
            current_page: 1,
            total: 1,
            total_pages: 1,
            size: 1,
            items: [],
        };
    }
}

const Payouts = async (): Promise<JSX.Element> => {
    apiClientServerInit();

    const payoutsResponse = await getPayouts();

    return <PayoutsPage payoutsResponse={payoutsResponse} />;
};

export default Payouts;
