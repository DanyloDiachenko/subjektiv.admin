import React from "react";

interface IProps {
    width?: number | string;
    height?: number | string;
    className?: string;
}

const IconAvatar = ({ width = 40, height = 40, className }: IProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 120 120"
            fill="none"
            className={className}
        >
            <g clipPath="url(#clip0_435_64006)">
                <circle
                    cx="60"
                    cy="60"
                    r="60"
                    fill="white"
                    fillOpacity="0.05"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M29.9307 49.8241C29.9307 33.1683 43.3621 19.666 59.9307 19.666C76.4992 19.666 89.9307 33.1682 89.9307 49.8241V86.1782C89.9307 86.2414 89.9217 86.3055 89.9273 86.3684C89.9295 86.3937 89.9307 86.4191 89.9307 86.4445C89.9307 87.7343 87.0311 88.9107 82.2645 89.8005C81.221 89.9953 80.2178 89.3349 79.9169 88.3118C78.1443 82.2864 75.6603 76.5234 71.793 71.2853C65.5481 62.8266 53.7146 62.7404 47.5147 71.2392C43.7002 76.468 41.2775 82.2148 39.5768 88.22C39.2826 89.2586 38.2671 89.9321 37.2124 89.7273C32.6748 88.8466 29.9307 87.6993 29.9307 86.4445C29.9307 86.4191 29.9318 86.3938 29.934 86.3684C29.9396 86.3055 29.9307 86.2414 29.9307 86.1782V49.8241ZM70.269 49.4651C70.269 55.2153 65.6125 59.8768 59.9118 59.8768C54.2112 59.8768 49.5547 55.2153 49.5547 49.4651C49.5547 43.7149 54.1917 39.0534 59.9118 39.0534C65.6319 39.0534 70.269 43.7149 70.269 49.4651Z"
                    fill="white"
                    fillOpacity="0.5"
                />
            </g>
            <defs>
                <clipPath id="clip0_435_64006">
                    <rect width="120" height="120" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default IconAvatar;
