"use client";

import { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { NoInternetConnectionWrapperProps } from "./component.props";

export const NoInternetConnection = ({
    children,
}: NoInternetConnectionWrapperProps) => {
    const [isOnline, setOnline] = useState(true);

    useEffect(() => {
        setOnline(navigator.onLine);

        const handleOnline = () => {
            setOnline(true);
        };

        const handleOffline = () => {
            setOnline(false);
        };

        global.window && global.window.addEventListener("online", handleOnline);
        global.window &&
            global.window.addEventListener("offline", handleOffline);

        return () => {
            global.window &&
                global.window.removeEventListener("online", handleOnline);
            global.window &&
                global.window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (isOnline) {
        return children;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <h1 className={styles.h2}>Oooops!</h1>
                <p className={styles.p}>
                    Slow or no internet connections. Please check your internet
                    settings.
                </p>
            </div>
        </div>
    );
};
