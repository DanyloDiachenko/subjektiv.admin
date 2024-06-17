type ObjectChannel = {
    [key: string]: boolean;
};

type Keys = {
    userMeChatId?: string;
    userChatId?: string;
    artworkId?: string | undefined;
    orderId?: string | undefined;
    isOrder: boolean;
};

export const checkChannelExistence = (
    objectChannel: ObjectChannel,
    keys: Keys,
): string | undefined => {
    const isMatch = Object.keys(objectChannel).find((key) => {
        return (
            key ===
                `${keys.isOrder ? "orders" : "messaging"}:${
                    keys.userMeChatId
                }-${keys.userChatId}${
                    keys.isOrder
                        ? "-" + keys.orderId
                        : keys.artworkId
                          ? "-" + keys.artworkId
                          : ""
                }` ||
            key ===
                `${keys.isOrder ? "orders" : "messaging"}:${keys.userChatId}-${
                    keys.userMeChatId
                }${
                    keys.isOrder
                        ? "-" + keys.orderId
                        : keys.artworkId
                          ? "-" + keys.artworkId
                          : ""
                }`
        );
    });

    return isMatch ? isMatch.split(":")[1] : undefined;
};
