import styles from "./input.module.scss";
import { InputProps } from "./input.props";

export const Input = ({
    errorMessage,
    className,
    ...props
}: InputProps): JSX.Element => {
    return (
        <>
            {" "}
            <input
                className={`form-control bg-transparent ${className}`}
                {...props}
            />
            {errorMessage && (
                <div className={styles.errorMessage}>{errorMessage}</div>
            )}
        </>
    );
};
