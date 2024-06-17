import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { ReduxProvider } from "@/store/ReduxProvider";
import { AllPopups } from "@/components/Popups/AllPopups";

const NotFound = (): JSX.Element => {
    /* deleteCookie(); */

    return (
        <body
            data-kt-app-header-fixed="true"
            data-kt-app-sidebar-fixed="true"
            data-kt-app-sidebar-push-header="true"
            className="app-default"
            id="body-id"
        >
            <ReduxProvider>
                <div
                    className="d-flex flex-column flex-root app-root"
                    style={{ position: "relative", overflowX: "hidden" }}
                >
                    <div className="app-page flex-column flex-column-fluid">
                        <Header />
                        <div
                            className="app-wrapper flex-column flex-row-fluid"
                            style={{
                                position: "relative",
                            }}
                        >
                            <Sidebar />
                            <div
                                className="app-main flex-column flex-row-fluid"
                                style={{ marginBottom: 60 }}
                            >
                                <h1 className="d-flex justify-content-center align-items-center">
                                    Page not found
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <AllPopups />
            </ReduxProvider>
        </body>
    );
};

export default NotFound;
