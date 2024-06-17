"use client";

import { ReactNode, useEffect } from "react";

import apiClient from "@/api/apiClient";
import { NoInternetConnection } from "@/components/NoInternetConnectionWrapper";

export default function SetClientToken({
    token,
    children,
    refreshToken,
}: {
    token: string | undefined;
    refreshToken: string | undefined;
    children: ReactNode;
}) {
    const handleRouteChange = () => {
        window.scrollTo(0, 0);
    };
    useEffect(() => {
        handleRouteChange();
    }, []);
    apiClient.setToken(token);
    apiClient.setRefreshToken(refreshToken);

    return (
        <>
            <NoInternetConnection>{children}</NoInternetConnection>
        </>
    );
}
