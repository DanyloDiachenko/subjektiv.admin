import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EventsTable } from "@/components/Tables/Events";

async function getEvents() {
    try {
        return await apiClient.main.event.eventControllerGetEvents({
            page: 1,
        });
    } catch (error) {
        console.log("error-getiing-events", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Event Management",
        url: "/events",
    },
    {
        title: "All Events",
        url: "/events",
    },
];

const EventsPage = async () => {
    apiClientServerInit();
    const eventsResponse = await getEvents();

    if (!eventsResponse) {
        return <></>;
    }

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Events
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>

                <div className="app-content flex-column-fluid">
                    <div className="app-container">
                        <div className="card">
                            <EventsTable eventsResponse={eventsResponse} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventsPage;
