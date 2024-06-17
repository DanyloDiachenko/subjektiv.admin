import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EventDetails } from "@/components/EventDetails";

interface EventPageProps {
    params: {
        id: number;
    };
}

async function getEvent(id: number) {
    try {
        return await apiClient.main.event.eventControllerGetEvent({
            id,
        });
    } catch (error) {
        console.log("error-getting-event", error);
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
        title: "Event Details",
        url: "#",
    },
];

const Event = async ({ params: { id } }: EventPageProps) => {
    apiClientServerInit();
    const event = await getEvent(id);

    if (!event) {
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
                                    View Event Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <EventDetails event={event} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Event;
