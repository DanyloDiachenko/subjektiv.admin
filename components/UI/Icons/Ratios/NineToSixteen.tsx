import { IconRationProps } from "./icon.props";

export const NineToSixteen = ({ isActive }: IconRationProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.2852 21.4287H8.1423C6.00801 21.4287 4.28516 19.7059 4.28516 17.5716V15.4287"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M4.28516 8.57129V6.42843C4.28516 4.29415 6.00801 2.57129 8.1423 2.57129H10.2852"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M19.7109 8.59961V6.45675C19.7109 4.32247 17.9881 2.59961 15.8538 2.59961H13.7109"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M19.7148 15.4287V17.5716C19.7148 19.7059 17.992 21.4287 15.8577 21.4287H13.7148"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
