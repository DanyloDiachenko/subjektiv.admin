import { Select } from "../Select";
import { QuantitySelectorProps } from "./quantitySelector.props";
import styles from "./styles.module.scss";

export const QuantitySelector = ({
    quantityPerPage,
    quantityPerPageVariants,
    setQuantityPerPage,
}: QuantitySelectorProps): JSX.Element => {
    return (
        <Select
            activeVariant={quantityPerPage}
            variants={quantityPerPageVariants}
            setActiveVariant={setQuantityPerPage}
            placeholder=""
            className={styles.select}
            isSelectIsQuantitySelect={true}
        />
    );
};
