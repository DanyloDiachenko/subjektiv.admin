export const formatLoginErrorMessage = (string: string): string => {
    const arrayErrors = [
        { error: "USER_NOT_FOUND", message: "User not found" },
        { error: "USER_NOT_CONFIRMED", message: "User not confirmed" },
    ];

    const result =
        arrayErrors.find((error) => error.error === string)?.message ?? string;
    return result.charAt(0).toUpperCase() + result.slice(1);
};
