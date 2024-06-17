import styles from "./input.module.scss";
import { CheckboxProps } from "./input.props";
import Image from "next/image";

export const Checkbox = ({
    errorMessage,
    isChecked,
    label,
    onClick,
}: CheckboxProps): JSX.Element => {
    return (
        <>
            <div className={styles.checkboxWrapper}>
                {" "}
                {isChecked ? (
                    <Image
                        src="/media/CheckboxSelected.svg"
                        width={20}
                        height={20}
                        alt="checkbox"
                        onClick={onClick}
                        className={styles.checkbox}
                    />
                ) : (
                    <Image
                        src="/media/CheckboxDefault.svg"
                        width={20}
                        height={20}
                        alt="checkbox"
                        onClick={onClick}
                        className={styles.checkbox}
                    />
                )}
                <div className={styles.checkboxLabel}>{label}</div>
            </div>

            <div className={styles.errorMessage}>{errorMessage}</div>
        </>
    );
};
