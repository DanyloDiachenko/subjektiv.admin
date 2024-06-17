export const returnIsUserActive = (isUserActive: boolean) => {
    if (isUserActive) {
        return "Active";
    }
    if (!isUserActive) {
        return "Blocked";
    }

    return "";
};
