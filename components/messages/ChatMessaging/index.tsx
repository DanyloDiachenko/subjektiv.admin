"use client";
import "./chat-messaging.scss";

import React, { useEffect, useState } from "react";
import { DefaultGenerics, StreamChat } from "stream-chat";
import {
    Channel,
    ChannelHeader,
    Chat,
    MessageInput,
    MessageList,
    Thread,
    Window,
} from "stream-chat-react";
import { SendButtonProps } from "stream-chat-react/dist/components/MessageInput/icons";

import MessagingSidebar from "@/components/messages/MessagingSidebar";

import PinnedMessageCustom from "../PinnedMessageCustom";
import { chatClientFunk } from "@/components/messages/chatClientFunk";

const ChatMessaging = () => {
    const [client, setClient] = useState<StreamChat<DefaultGenerics>>();

    useEffect(() => {
        const init = async () => {
            const chatClient = await chatClientFunk();

            setClient(chatClient);

            if (client) return async () => client.disconnectUser();
        };
        void init();
    }, []);

    if (!client) {
        return <div>Loading...</div>;
    }

    const SendButton = ({ sendMessage, ...rest }: SendButtonProps) => (
        <button
            className="str-chat__send-button"
            onClick={sendMessage}
            type="button"
            {...rest}
        >
            Send
        </button>
    );

    return (
        <div className="chat-messaging">
            <Chat
                client={client}
                theme="messaging light"
                useImageFlagEmojisOnWindows={true}
                customClasses={{
                    channelList: "str-chat__theme-light str-chat__channel-list",
                    channel: "str-chat__theme-light str-chat__channel",
                }}
                defaultLanguage={"en"}
            >
                <MessagingSidebar />
                <Channel
                    maxNumberOfFiles={10}
                    multipleUploads={true}
                    SendButton={SendButton}
                    TypingIndicator={() => null}
                >
                    <Window>
                        <ChannelHeader />
                        <div className="pb-4">
                            <PinnedMessageCustom />
                        </div>
                        <MessageList />
                        <MessageInput />
                    </Window>
                    <Thread enableDateSeparator virtualized />
                </Channel>
            </Chat>
        </div>
    );
};

export default ChatMessaging;
