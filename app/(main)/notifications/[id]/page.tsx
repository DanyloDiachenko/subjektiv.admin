import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NotificationDetails } from "@/components/NotificationDetails";
import { notFound } from "next/navigation";

interface NotificationPageProps {
    params: {
        id: number;
    };
}

async function getNotification(id: number) {
    try {
        return await apiClient.main.adminNotification.adminNotificationControllerGetById(
            {
                id,
            },
        );
    } catch (error) {
        console.log("error-getting-notification", error);

        return notFound();
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Notifications Management",
        url: "/notifications",
    },
    {
        title: "Notification Details",
        url: "#",
    },
];

const Notification = async ({ params: { id } }: NotificationPageProps) => {
    apiClientServerInit();
    const notification = await getNotification(id);

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Notification Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <NotificationDetails notification={notification} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notification;
