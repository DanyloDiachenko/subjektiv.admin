import { IconRationProps } from "./icon.props";

export const OneToOne = ({ isActive }: IconRationProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.28516 10.2861V8.14328C4.28516 6.00899 6.00801 4.28613 8.1423 4.28613H10.2852M13.7137 4.28613H15.8566C17.9909 4.28613 19.7137 6.00899 19.7137 8.14328V10.2861M19.7137 13.7147V15.8576C19.7137 17.9918 17.9909 19.7147 15.8566 19.7147H13.7137M10.2852 19.7147H8.1423C6.00801 19.7147 4.28516 17.9918 4.28516 15.8576V13.7147"
                stroke={isActive ? "#3E97FF" : "#7E8299"}
                stroke-width="1.28571"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
