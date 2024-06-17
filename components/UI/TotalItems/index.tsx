import { TotalItemsProps } from "./totalItems.props";
import styles from "./styles.module.scss";

export const TotalItems = ({ number }: TotalItemsProps) => {
    return <div className={styles.itemsQuantity}>{number} items</div>;
};
