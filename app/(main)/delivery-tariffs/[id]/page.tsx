import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import NotFound from "@/app/not-found";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TariffDetails } from "@/components/TariffDetails";

interface TariffPageProps {
    params: {
        id: number;
    };
}

async function getTariff(id: number) {
    try {
        return await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerGetId(
            {
                id,
            },
        );
    } catch (error) {
        console.log("error-getting-tariff", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Tariff Management",
        url: "/delivery-tariffs",
    },
    {
        title: "Tariff Details",
        url: "#",
    },
];

const Tariff = async ({ params: { id } }: TariffPageProps) => {
    apiClientServerInit();
    const tariff = await getTariff(id);

    if (!tariff) {
        return <NotFound />;
    }

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Tariff Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <TariffDetails tariff={tariff} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tariff;
