import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NotificationsProps } from "./posts.props";
import { NotificationsTable } from "../Tables/Notifications";

export const NotificationsPage = ({
    notificationsResponse,
}: NotificationsProps): JSX.Element => {
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
            title: "All Notifications",
            url: "/notifications",
        },
    ];

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container  d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            All Notifications
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>
            <div className="app-content flex-column-fluid">
                <div className="app-container  ">
                    <div className="card">
                        <NotificationsTable
                            notificationsResponse={notificationsResponse}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
