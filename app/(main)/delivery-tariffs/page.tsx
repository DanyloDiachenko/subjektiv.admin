import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TariffsTable } from "@/components/Tables/Tariffs";

async function getTariffs() {
    try {
        return await apiClient.main.adminDeliveryTariff.adminDeliveryTariffControllerGetList(
            {
                page: 1,
            },
        );
    } catch (error) {
        console.log("error-getiing-tariffs", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Tariff Management",
        url: "/events",
    },
    {
        title: "All Tariffs",
        url: "/events",
    },
];

const TariffsPage = async () => {
    apiClientServerInit();
    const tariffsResponse = await getTariffs();

    if (!tariffsResponse) {
        return <></>;
    }

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Delivery Tariffs
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>

                <div className="app-content flex-column-fluid">
                    <div className="app-container">
                        <div className="card">
                            <TariffsTable tariffsResponse={tariffsResponse} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TariffsPage;
