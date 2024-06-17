"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { ITab } from "./tab.interface";
import { NavbarProps } from "./navbar.props";
import { scrollElementToView } from "@/helpers/scrollElementToView";

export const Navbar = ({ tabs }: NavbarProps): JSX.Element => {
    const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

    /* const checkVisibleBlock = () => {
        tabs.forEach((tab) => {
            const element = document.getElementById(tab.link);
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const isVisible =
                rect.top >= 0 && rect.bottom <= window.innerHeight;

            if (isVisible) {
                const findedTab = tabs.find(
                    (tabMain) => tabMain.link === tab.link
                );

                if (!findedTab) {
                    return;
                }

                setActiveTab(findedTab);
                
                return;
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibleBlock);

        return () => {
            window.removeEventListener('scroll', checkVisibleBlock);
        };
    }, [tabs]); */

    const onClickTabHandler = (tab: ITab) => {
        scrollElementToView(tab.link);
        setActiveTab(tab);
    };

    return (
        <ul
            className={`nav nav-custom nav-tabs nav-line-tabs nav-line-tabs-2x border-0 fs-4 fw-semibold mb-8 ${styles.navbar}`}
        >
            {tabs.map((tab, index) => (
                <li key={index} className="nav-item">
                    <div
                        onClick={() => onClickTabHandler(tab)}
                        className={`nav-link text-active-primary pb-4 ${
                            activeTab.link === tab.link ? styles.linkActive : ""
                        }`}
                    >
                        {tab.title}
                    </div>
                </li>
            ))}
        </ul>
    );
};
