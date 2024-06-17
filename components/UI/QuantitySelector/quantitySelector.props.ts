import { ISelectVariant } from "../Select/variant.interface";

export interface QuantitySelectorProps {
    quantityPerPage: ISelectVariant;
    quantityPerPageVariants: ISelectVariant[];
    setQuantityPerPage: (quantityPerPage: ISelectVariant) => void;
}
