"use server";

import { LayoutProps } from "@/app/layout.props";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import apiClient from "@/api/apiClient";
import SetClientToken from "@/api/setClientToken";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { ReduxProvider } from "@/store/ReduxProvider";
import { AllPopups } from "@/components/Popups/AllPopups";

const RootLayout = async ({ children }: LayoutProps) => {
    apiClientServerInit();

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
                    style={{ position: "relative" }}
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
                                <SetClientToken
                                    token={apiClient.getToken()}
                                    refreshToken={apiClient.getRefreshToken()}
                                >
                                    {children}
                                </SetClientToken>
                            </div>
                        </div>
                    </div>
                </div>
                <AllPopups />
            </ReduxProvider>
        </body>
    );
};

export default RootLayout;
