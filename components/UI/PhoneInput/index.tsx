"use client";
import styles from "./input.module.scss";
import React, { useEffect, useState } from "react";
import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";
import { InputProps } from "./input.props";

const PhoneNumberInput = ({
    value,
    className,
    onChangeValue,
    country,
    errorMessage,
    ...props
}: InputProps): JSX.Element => {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const [errorMessageFromLib, setErrorMessageFromLib] = useState("");
    const countryCode = phoneUtil.getCountryCodeForRegion(country as string);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let rawInput = e.target.value.replace(/\D/g, "");

        if (rawInput.length > 0 && !rawInput.startsWith("+")) {
            rawInput = `+` + rawInput;
        }

        try {
            const number = phoneUtil.parseAndKeepRawInput(rawInput);

            if (phoneUtil.isValidNumber(number)) {
                onChangeValue &&
                    onChangeValue(
                        "phone",
                        phoneUtil.format(
                            number,
                            PhoneNumberFormat.INTERNATIONAL,
                        ),
                    );
            } else {
                onChangeValue && onChangeValue("phone", rawInput);
                if (rawInput.length >= 15) {
                    setErrorMessageFromLib(
                        "Invalid phone number. Check your country code.",
                    );
                } else {
                    setErrorMessageFromLib("");
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("long")) {
                    setErrorMessageFromLib(
                        "Invalid phone number. Check your country code.",
                    );
                } else {
                    setErrorMessageFromLib(error.message);
                }
            } else {
                setErrorMessageFromLib("An unknown error occurred");
            }
            onChangeValue && onChangeValue("phone", rawInput);
        }
        if (rawInput === "") {
            setErrorMessageFromLib("");
        }
    };
    useEffect(() => {
        if (countryCode !== 0 && !value) {
            onChangeValue && onChangeValue("phone", `+${countryCode}`);
        }
    }, [countryCode]);

    return (
        <div>
            <input
                className={`form-control bg-transparent ${className}`}
                type="text"
                value={value}
                onChange={handleOnChange}
                {...props}
            />
            <div className={styles.errorMessage}>
                {errorMessage ? errorMessage : errorMessageFromLib}
            </div>
        </div>
    );
};

export default PhoneNumberInput;
