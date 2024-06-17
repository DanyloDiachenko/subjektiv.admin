import { IconRationProps } from "./icon.props";

export const TwoToThree = ({ isActive }: IconRationProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.57031 10.2861V8.14328C2.57031 6.00899 4.29317 4.28613 6.42746 4.28613H8.57031"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.4297 4.28613H17.5725C19.7068 4.28613 21.4297 6.00899 21.4297 8.14328V10.2861"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M21.4287 13.71V15.857C21.4287 17.9912 19.7058 19.7141 17.5716 19.7141H15.5"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.57031 19.7139H6.42746C4.29317 19.7139 2.57031 17.991 2.57031 15.8567V13.7139"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
