import styles from "./switch.module.scss";
import { SwitchProps } from "./module.props";

export const Switch = ({ isChecked, onChange }: SwitchProps): JSX.Element => {
    const toggleChecked = () => {
        const newChecked = !isChecked;
        onChange(newChecked);
    };

    return (
        <label
            className={`${styles.toogle} ${
                isChecked ? styles.toogleChecked : ""
            }`}
        >
            <input
                type="checkbox"
                value={String(isChecked)}
                checked={isChecked}
                onChange={toggleChecked}
            />
            <div className={styles.toogleSlider} />
        </label>
    );
};
