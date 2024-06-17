import Link from "next/link";

import styles from "./styles.module.scss";
import { BreadcrumbsProps } from "./module.props";

export const Breadcrumbs = ({ routes }: BreadcrumbsProps): JSX.Element => {
    return (
        <ul className="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1">
            {routes.map((route, index) => (
                <>
                    <li className="breadcrumb-item text-muted">
                        <Link
                            className={`text-muted ${styles.link}`}
                            href={route.url}
                        >
                            {route.title}
                        </Link>
                    </li>
                    {index === routes.length - 1 ? (
                        <></>
                    ) : (
                        <li className="breadcrumb-item">
                            <span className="bullet bg-gray-400 w-5px h-2px"></span>
                        </li>
                    )}
                </>
            ))}
        </ul>
    );
};
