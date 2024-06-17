import { useEffect, useState } from "react";
import { DefaultGenerics, StreamChat } from "stream-chat";

export const useChatClient = () => {
    const [client, setClient] = useState<StreamChat<DefaultGenerics>>();
    const user = {
        id: process.env.NEXT_PUBLIC_SUPPORT_ADMIN_CHAT_ID ?? "",
        name: `Subjektiv Support`,
        image: "/media/Avatar.svg",
    };
    useEffect(() => {
        const initChat = async () => {
            const chatClient = StreamChat.getInstance(
                process.env.NEXT_PUBLIC_MESSAGES_API_KEY ?? "",
            );
            await chatClient.connectUser(user, chatClient.devToken(user.id));
            setClient(chatClient);
        };
        void initChat();

        return () => {
            if (client) {
                void client.disconnect();
            }
        };
    }, []);

    return client;
};
