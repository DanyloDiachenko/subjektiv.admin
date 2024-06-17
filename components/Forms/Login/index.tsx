"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

import { Button } from "@/components/UI/Button";
import styles from "./login.module.scss";
import { Input } from "@/components/UI/Input";
import apiClient, { REFRESH_TOKEN_COOKIE_LIFETIME_DAYS } from "@/api/apiClient";
import { setCookie } from "@/api/cookies";
import { storage } from "@/helpers/storage";
import { formatLoginErrorMessage } from "@/helpers/formatLoginErrorMessage";
import { Tooltip } from "@/components/UI/Tootip";

export const LoginForm = (): JSX.Element => {
    const router = useRouter();

    const [emailInput, setEmailInput] = useState<string>("");
    const [passwordInput, setPasswordInput] = useState<string>("");
    const [emptyInputes, setEmptyInputes] = useState<{
        email: boolean;
        password: boolean;
    }>({ email: false, password: false });
    const [errorEmailMessage, setErrorEmailMessage] = useState("");
    const [errorPasswordMessage, setErrorPasswordMessage] = useState("");

    const onEmailInputChange = (inputValue: string) => {
        setEmailInput(inputValue);

        if (!inputValue.length) {
            setEmptyInputes({ ...emptyInputes, email: true });
        } else {
            setEmptyInputes({ ...emptyInputes, email: false });
        }
    };

    const onPasswordInputChange = (inputValue: string) => {
        setPasswordInput(inputValue);

        if (!inputValue.length) {
            setEmptyInputes({ ...emptyInputes, password: true });
        } else {
            setEmptyInputes({ ...emptyInputes, password: false });
        }
    };

    const fetchGetMe = async () => {
        try {
            const responseGetMe = await apiClient.main.user.userControllerGetMe(
                {
                    contentLanguage: "en",
                },
            );

            storage.setItem("user", responseGetMe);

            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    const onFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailInput.length && passwordInput.length) {
            try {
                const response = await apiClient.auth.auth.authControllerLogin({
                    requestBody: {
                        email: emailInput,
                        password: passwordInput,
                        remember_me: true,
                    },
                });

                if (response.success) {
                    setErrorEmailMessage("");
                    setErrorPasswordMessage("");

                    if (response.data.groups.includes("Admin")) {
                        apiClient.setToken(response.data.idToken);
                        apiClient.setRefreshToken(response.data.refreshToken);

                        setCookie(
                            "isAdmin",
                            response.data.groups.includes("Admin") ? "1" : "0",
                            REFRESH_TOKEN_COOKIE_LIFETIME_DAYS,
                        );

                        await fetchGetMe();

                        router.replace("/users");
                    } else {
                        setErrorPasswordMessage("You are not admin");
                    }
                }
            } catch (error: any) {
                console.log(error);

                const responseError = error.response;

                if (responseError && responseError.data) {
                    if ("INVALID_CREDENTIALS".includes(responseError.message)) {
                        setErrorEmailMessage("");
                        setErrorPasswordMessage("Invalid email or password");
                    } else {
                        responseError.data.email &&
                            (setErrorPasswordMessage(""),
                            setErrorEmailMessage(
                                formatLoginErrorMessage(
                                    responseError.data.email,
                                ),
                            ));
                        responseError.data.password &&
                            (setErrorEmailMessage(""),
                            setErrorPasswordMessage(
                                formatLoginErrorMessage(
                                    responseError.data.password,
                                ),
                            ));
                    }
                }
            }
        } else {
            if (!emailInput.length) {
                setEmptyInputes({ ...emptyInputes, email: true });
            }
            if (!passwordInput.length) {
                setEmptyInputes({ ...emptyInputes, password: true });
            }
        }
    };

    /* useEffect(() => {
        if (getCookie('token')) {
            router.push('/users');
        }
    }, []); */

    return (
        <form className="form w-100" onSubmit={onFormSubmit}>
            <div className="text-center mb-11">
                <h1 className="text-dark fw-bolder mb-3">Sign In</h1>
                <div className="text-gray-500 fw-semibold fs-6">
                    Your Social Campaigns
                </div>
            </div>
            <div className="fv-row mb-8">
                <Input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={emailInput}
                    onChange={(e) => onEmailInputChange(e.target.value)}
                    className={emptyInputes.email ? styles.inputEmpty : ""}
                />
                <div className={styles.errorMessage}>{errorEmailMessage}</div>
            </div>
            <div className="fv-row mb-3">
                <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={passwordInput}
                    onChange={(e) => onPasswordInputChange(e.target.value)}
                    className={emptyInputes.password ? styles.inputEmpty : ""}
                />
                <div className={styles.errorMessage}>
                    {errorPasswordMessage}
                </div>
            </div>
            <div className="d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8">
                <span></span>
                <Tooltip id="tooltip-forgotPassword" />
                <Link
                    className={styles.forgorPasswordLink}
                    href="#"
                    data-tooltip-content="Currently doesn`t work"
                    data-tooltip-id="tooltip-forgotPassword"
                >
                    Forgot Password?
                </Link>
            </div>
            <div className="d-grid">
                <Button type="submit" appearance="blue">
                    Sign In
                </Button>
            </div>
        </form>
    );
};
