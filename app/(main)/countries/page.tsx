import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CountriesTable } from "@/components/Tables/Countries";

async function getCountries() {
    try {
        return await apiClient.main.countries.countryControllerGetAll({
            page: 1,
        });
    } catch (error) {
        console.log("error-getiing-countries", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Country Management",
        url: "/countries",
    },
    {
        title: "All Countries",
        url: "/countries",
    },
];

const CountriesPage = async () => {
    apiClientServerInit();
    const countriesResponse = await getCountries();

    if (!countriesResponse) {
        return <></>;
    }

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Countries
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>

                <div className="app-content flex-column-fluid">
                    <div className="app-container">
                        <div className="card">
                            <CountriesTable
                                countriesResponse={countriesResponse}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CountriesPage;
