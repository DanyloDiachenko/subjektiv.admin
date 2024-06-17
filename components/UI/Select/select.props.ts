import { ISelectVariant } from "./variant.interface";

export interface SelectProps {
    className?: string;

    placeholder: string;
    activeVariant: ISelectVariant | null;
    setActiveVariant: (variant: ISelectVariant) => void;
    variants: ISelectVariant[];
    isSelectIsQuantitySelect?: boolean;
    isRemoveArrow?: boolean;
}
