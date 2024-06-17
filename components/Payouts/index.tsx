import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PayoutsProps } from "./posts.props";
import { PayoutsTable } from "../Tables/Payouts";

export const PayoutsPage = ({ payoutsResponse }: PayoutsProps): JSX.Element => {
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
            title: "All Payouts",
            url: "/payouts",
        },
    ];

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container  d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            All Payouts
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>
            <div className="app-content flex-column-fluid">
                <div className="app-container  ">
                    <div className="card">
                        <PayoutsTable payoutsResponse={payoutsResponse} />
                    </div>
                </div>
            </div>
        </div>
    );
};
