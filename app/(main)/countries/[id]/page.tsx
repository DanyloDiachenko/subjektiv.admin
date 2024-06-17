import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CountryDetails } from "@/components/CountrysDetails";

interface CountryPageProps {
    params: {
        id: number;
    };
}

async function getCountry(id: number) {
    try {
        return await apiClient.main.countries.countryControllerGetCountry({
            id,
        });
    } catch (error) {
        console.log("error-getting-country", error);
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
        title: "Country Details",
        url: "#",
    },
];

const Country = async ({ params: { id } }: CountryPageProps) => {
    apiClientServerInit();
    const country = await getCountry(id);

    if (!country) {
        return <></>;
    }

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Country Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <CountryDetails country={country} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Country;
