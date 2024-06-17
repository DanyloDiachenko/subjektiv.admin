import { StreamChat } from "stream-chat";

export const chatClientFunk = async () => {
    const user = {
        id: process.env.NEXT_PUBLIC_SUPPORT_ADMIN_CHAT_ID ?? "",
        name: `Subjektiv Support`,
        image: "/media/Avatar.svg",
    };
    // const chatClient = StreamChat.getInstance('8ykwujfequx5');
    const chatClient = StreamChat.getInstance(
        process.env.NEXT_PUBLIC_MESSAGES_API_KEY ?? "",
    );
    await chatClient.connectUser(user, chatClient.devToken(user.id));
    // console.log('chatClient', chatClient);
    // if (chatClient) {
    //     await chatClient.disconnectUser();
    // }
    return chatClient;
};
