import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PayoutDetails } from "@/components/PayoutDetails";
import { notFound } from "next/navigation";

interface PayoutPageProps {
    params: {
        id: number;
    };
}

async function getPayout(id: number) {
    try {
        return await apiClient.main.artworkOrder.artworkOrderControllerGetPayout(
            {
                id,
            },
        );
    } catch (error) {
        console.log("error-getting-payout", error);

        return notFound();
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Payouts Management",
        url: "/payouts",
    },
    {
        title: "Payout Details",
        url: "#",
    },
];

const Payout = async ({ params: { id } }: PayoutPageProps) => {
    apiClientServerInit();
    const payout = await getPayout(id);

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Payout Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <PayoutDetails payout={payout} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payout;
