"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import styles from "./sidebar.module.scss";
import { INavigation } from "./navigation.interface";
import { usePathname } from "next/navigation";
import { ISidebarOpenedStore } from "@/store/sidebarOpened/initStore";
import { connect } from "react-redux";
import { SidebarProps } from "./sidebar.props";
import onClickOutside from "@/helpers/onClickOutside";

const navigation: INavigation[] = [
    // {
    //     id: 0,
    //     icon: "/media/access-control.svg",
    //     title: "Access Control",
    //     links: [
    //         {
    //             title: "#",
    //             link: "#",
    //         },
    //     ],
    // },
    {
        id: 1,
        icon: "/media/artwork-management.svg",
        title: "Artwork Management",
        links: [
            {
                title: "All Artworks",
                link: "/artworks",
            },
            {
                title: "Moderation",
                link: "/artworks/moderation",
            },
            {
                title: "Artwork Posts",
                link: "/artwork-posts",
            },
        ],
    },
    {
        id: 2,
        icon: "/media/user-management.svg",
        title: "User Management",
        links: [
            {
                title: "All Users",
                link: "/users",
            },
            {
                title: "Verfiy Users",
                link: "/verify-users",
            },
            {
                title: "Wanted Expert Users",
                link: "/expert-wanted",
            },
            // {
            //     title: "Expert requests",
            //     link: "#",
            // },
        ],
    },
    // {
    //     id: 3,
    //     icon: "/media/operation-control.svg",
    //     title: "Operation Control",
    //     links: [
    //         {
    //             title: "#",
    //             link: "#",
    //         },
    //     ],
    // },
    // {
    //     id: 4,
    //     icon: "/media/settings.svg",
    //     title: "General",
    //     links: [
    //         {
    //             title: "Category",
    //             link: "/general/categories",
    //         },
    //         {
    //             title: "Style",
    //             link: "/general/styles",
    //         },
    //         {
    //             title: "Material",
    //             link: "/general/materials",
    //         },
    //         {
    //             title: "Keywords",
    //             link: "/general/keywords",
    //         },
    //         {
    //             title: "Subject",
    //             link: "/general/subjects",
    //         },
    //     ],
    // },
    {
        id: 4,
        icon: "/media/settings.svg",
        title: "Orders Workspace",
        links: [
            {
                title: "Orders Listing",
                link: "/orders",
            },
            {
                title: "Order Payouts",
                link: "/payouts",
            },
        ],
    },
    {
        id: 5,
        icon: "/media/settings.svg",
        title: "App Settings",
        links: [
            {
                title: "Artwork",
                link: "/app-settings/artwork",
            },
            {
                title: "Countries",
                link: "/countries",
            },
            {
                title: "Events",
                link: "/events",
            },
            {
                title: "Reflection Questions",
                link: "/reflection-questions",
            },
            {
                title: "Delivery Tariffs",
                link: "/delivery-tariffs",
            },
            {
                title: "Calculate Delivery",
                link: "/calculate",
            },
        ],
    },
    {
        id: 6,
        icon: "/media/user-management.svg",
        title: "Support",
        links: [
            {
                title: "Chat",
                link: "/chat",
            },
        ],
    },
    {
        id: 7,
        icon: "/media/user-management.svg",
        title: "Notifications",
        links: [
            {
                title: "Notifications",
                link: "/notifications",
            },
        ],
    },
];

const SidebarComponent = ({
    isSidebarOpened,
    setSidebarOpened,
}: SidebarProps): JSX.Element => {
    const pathname = usePathname();

    const sidebarRef = useRef(null);
    onClickOutside(sidebarRef, () => {
        setSidebarOpened(false);
    });

    const [openedMenuTabIndex, setOpenedMenuTabIndex] = useState<number>(
        navigation[0].id,
    );
    const [activeTabLink, setActiveTabLink] = useState<string>("");

    useEffect(() => {
        const handleRouteChange = () => {
            const activeNavItem = navigation.find((navItem) =>
                navItem.links.some((link) => pathname.includes(link.link)),
            );

            if (activeNavItem) {
                setOpenedMenuTabIndex(activeNavItem.id);
                const activeLink = activeNavItem.links.find((link) =>
                    pathname.includes(link.link),
                );
                if (activeLink) {
                    setActiveTabLink(activeLink.link);
                }
            }
        };

        handleRouteChange();

        setSidebarOpened(false);
    }, [pathname]);

    return (
        <div
            className={`app-sidebar flex-column ${styles.sidebar} ${
                isSidebarOpened ? styles.opened : ""
            }`}
            ref={sidebarRef}
        >
            <div className={`app-sidebar-logo px-6 ${styles.topContent}`}>
                <a href="/artworks">
                    <img alt="Logo" src="/media/logo-small.png" />
                </a>
            </div>

            <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
                <div className="app-sidebar-wrapper">
                    <div className="scroll-y">
                        <div
                            className={`menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6 ${styles.menuContent}`}
                        >
                            <div className={`menu-item ${styles.menuItem}`}>
                                <div
                                    className={`menu-content ${styles.menuContent}`}
                                >
                                    <span className="menu-heading fw-bold text-uppercase fs-7">
                                        Pages
                                    </span>
                                </div>
                            </div>
                            {navigation.map((nav, index) => (
                                <div
                                    key={index}
                                    className={`menu-item menu-accordion ${
                                        styles.menuItemAccordion
                                    } ${
                                        openedMenuTabIndex === nav.id
                                            ? "show"
                                            : ""
                                    }`}
                                >
                                    <span
                                        className={`menu-link ${styles.menuLink}`}
                                        onClick={() =>
                                            setOpenedMenuTabIndex(
                                                nav.id === openedMenuTabIndex
                                                    ? -1
                                                    : nav.id,
                                            )
                                        }
                                    >
                                        <span
                                            className={`menu-icon ${styles.menuIcon}`}
                                        >
                                            <Image
                                                src={nav.icon}
                                                alt="access control"
                                                width={20}
                                                height={20}
                                            />
                                        </span>
                                        <span
                                            className={`menu-title ${styles.menuTitle}`}
                                        >
                                            {nav.title}
                                        </span>
                                        <span
                                            className={`menu-arrow ${styles.menuArrow}`}
                                        ></span>
                                    </span>
                                    <div
                                        className={`menu-sub menu-sub-accordion ${
                                            styles.wrapper
                                        } ${
                                            openedMenuTabIndex === nav.id
                                                ? styles.show
                                                : ""
                                        }`}
                                    >
                                        <div className={styles.linksWrapper}>
                                            {nav.links.map((link, index) => (
                                                <div
                                                    key={index}
                                                    className={`menu-item `}
                                                >
                                                    <Link
                                                        className={`menu-link ${
                                                            styles.menuItemLink
                                                        } ${
                                                            activeTabLink ===
                                                            link.link
                                                                ? styles.menuItemLinkActive
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            setActiveTabLink(
                                                                link.link,
                                                            )
                                                        }
                                                        href={link.link}
                                                    >
                                                        <span className="menu-bullet">
                                                            <span className="bullet bullet-dot"></span>
                                                        </span>
                                                        <span
                                                            className={`menu-title ${styles.linkAdditional}`}
                                                        >
                                                            {link.title}
                                                        </span>
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
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
export const Sidebar = connector(SidebarComponent);
