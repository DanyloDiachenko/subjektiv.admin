"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./header.module.scss";
import { setCookie } from "@/api/cookies";
import { ISidebarOpenedStore } from "@/store/sidebarOpened/initStore";
import { HeaderProps } from "./header.props";
import { connect } from "react-redux";

const HeaderComponent = ({
    isSidebarOpened,
    setSidebarOpened,
}: HeaderProps): JSX.Element => {
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("user");
        setCookie("token", "");

        router.push("/login");
    };

    return (
        <div className={`app-header ${styles.header}`} id="header">
            <div className="app-container container-fluid d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-stretch justify-content-end flex-lg-grow-1">
                    <div className="app-navbar flex-shrink-0">
                        <div className="app-navbar-item ms-1 ms-md-4">
                            <div className=" btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary">
                                <div className={styles.adminIcon}>
                                    <Image
                                        src="/media/admin.png"
                                        alt="user"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="app-navbar-item ms-1 ms-md-4">
                            <div
                                onClick={logout}
                                className={`btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px position-relative ${styles.logout}`}
                            >
                                <Image
                                    src="/media/exit.svg"
                                    alt="exit"
                                    width={22}
                                    height={22}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className={styles.burgerMenu}
                    onClick={() => setSidebarOpened(!isSidebarOpened)}
                >
                    <img src="/media/burger.png" alt="burger menu" />
                </button>
            </div>
        </div>
    );
};

const mapState = (state: { sidebarOpened: ISidebarOpenedStore }) => {
    return {
        isSidebarOpened: state.sidebarOpened.isOpened,
    };
};
const mapDispatch = {
    setSidebarOpened: (isOpened: boolean) => ({
        type: "SET_SIDEBAR_OPENED",
        isOpened,
    }),
};
const connector = connect(mapState, mapDispatch);
export const Header = connector(HeaderComponent);
