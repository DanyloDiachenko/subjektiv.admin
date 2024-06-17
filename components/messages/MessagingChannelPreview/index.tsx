import "./MessagingChannelPreview.scss";

import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import Moment from "react-moment";
import type { ChannelMemberResponse } from "stream-chat";
import {
    ChannelPreviewUIComponentProps,
    useChatContext,
} from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";
import IconAvatar from "@/components/messages/IconAvatar";
import DoubleCheckmarkIcon from "@/components/messages/DoubleCheckmarkIcon";

const getChannelName = (members: ChannelMemberResponse[]) => {
    const defaultName = "Johnny Blaze";

    if (members.length === 0 || members.length === 1) {
        return members[0]?.user?.name || defaultName;
    }

    return `${members[0]?.user?.name || defaultName}, ${
        members[1]?.user?.name || defaultName
    }`;
};

type MessagingChannelPreviewProps =
    ChannelPreviewUIComponentProps<DefaultStreamChatGenerics> & {
        onClick: MouseEventHandler;
    };

const MessagingChannelPreview = (props: MessagingChannelPreviewProps) => {
    const [errorImage, setErrorImage] = useState("");
    const { channel, setActiveChannel, onClick, latestMessage } = props;
    const { channel: activeChannel, client } = useChatContext();
    const members = Object.values(channel.state.members).filter(
        ({ user }) => user?.id !== client.userID,
    );
    //
    // activeChannel?.delete();
    //
    console.log("channels:", channel);
    return (
        <div
            className={`   ${
                channel?.id === activeChannel?.id &&
                channel.type === activeChannel?.type
                    ? "channel-preview__container selected"
                    : "channel-preview__container"
            }`}
            onClick={(event) => {
                onClick(event);
                setActiveChannel?.(channel);
            }}
        >
            <div className="channel-preview-avatar">
                {members.length > 0 ? (
                    members.map((person) => {
                        return (
                            <div
                                key={person.user?.id}
                                className="channel-preview-avatar__wrapper"
                            >
                                {person.user && person.user.image ? (
                                    <Image
                                        src={
                                            errorImage === ""
                                                ? person.user?.image
                                                : errorImage
                                        }
                                        className="channel-preview-avatar__img"
                                        alt="artwork"
                                        width={40}
                                        height={40}
                                        onError={() =>
                                            setErrorImage(
                                                "/media/no-avatar.png",
                                            )
                                        }
                                    />
                                ) : (
                                    <IconAvatar width={40} height={40} />
                                )}
                                <div className=" channel-preview-avatar__online-wrapper  ">
                                    <div
                                        className={`channel-preview-avatar__online-icon ${
                                            person.user?.online
                                                ? "channel-preview-avatar__online-icon_green"
                                                : "channel-preview-avatar__online-icon_grey"
                                        } `}
                                    />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="channel-preview-avatar__wrapper">
                        <IconAvatar width={40} height={40} />
                    </div>
                )}
            </div>
            <div className="channel-preview__content-wrapper">
                <div className="channel-preview__content-top">
                    <p className="channel-preview__content-name">
                        {channel.data?.name || getChannelName(members)}
                    </p>
                    <Moment
                        className="channel-preview__content-time"
                        date={channel.state.last_message_at?.toString()}
                        fromNow
                    />
                </div>
                <div className="channel-preview__messages-wrapper">
                    <div className="channel-preview__content-message">
                        {latestMessage}
                    </div>
                    {channel.state.unreadCount ? (
                        <div className="channel-preview__messages-count">
                            <p>{channel.state.unreadCount}</p>
                        </div>
                    ) : (
                        <DoubleCheckmarkIcon />
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessagingChannelPreview;
