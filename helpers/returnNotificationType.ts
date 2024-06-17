import { AdminNotificationType } from "@/submodules/common-dto/api-client/main";

const formatString = (str: string): string => {
    return str
        .replace(/([A-Z])/g, " $1")
        .trim()
        .replace(
            /\w\S*/g,
            (word) =>
                word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
        );
};

export const getFormattedNotificationType = (
    notificationType: AdminNotificationType,
): string => {
    return formatString(notificationType);
};
