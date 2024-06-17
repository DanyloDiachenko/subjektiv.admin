import styles from "./button.module.scss";
import { ButtonProps } from "./button.props";

export const Button = ({
    className,
    children,
    appearance,
    ...props
}: ButtonProps): JSX.Element => {
    switch (appearance) {
        case "blue": {
            return (
                <button
                    className={`${styles.button} ${styles.buttonBlue} ${className}`}
                    {...props}
                >
                    {children}
                </button>
            );
        }
        case "grey": {
            return (
                <button
                    className={`${styles.button} ${styles.buttonGrey} ${className}`}
                    {...props}
                >
                    {children}
                </button>
            );
        }
        case "lightBlue": {
            return (
                <button
                    className={`${styles.button} ${styles.buttonLightBlue} ${className}`}
                    {...props}
                >
                    {children}
                </button>
            );
        }
        case "red": {
            return (
                <button
                    className={`${styles.button} ${styles.buttonRed} ${className}`}
                    {...props}
                >
                    {children}
                </button>
            );
        }
    }
};
