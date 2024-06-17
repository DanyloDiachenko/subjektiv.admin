import "./pinned-message-custom.scss";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useChatContext } from "stream-chat-react";

const PinnedMessageCustom = () => {
    const { channel: activeChannel } = useChatContext();
    const pinnedMessage = activeChannel?.state.pinnedMessages[0];
    const type = String(activeChannel?.data?.type);

    if (!pinnedMessage || pinnedMessage.attachments?.length === 0) {
        return <></>;
    }

    return (
        <>
            {pinnedMessage.attachments?.map((attachment, index) => (
                <Link
                    href={String(attachment.og_scrape_url)}
                    key={index}
                    className="pinned-message-custom"
                    target={"_blank"}
                >
                    {attachment ? (
                        <div className="pinned-message-custom__attachment">
                            <div className="pinned-message-custom__attachment_wrapper-img ">
                                {attachment.image_url && (
                                    <Image
                                        src={String(attachment.image_url)}
                                        className="pinned-message-custom__attachment_img "
                                        alt="artwork"
                                        width={44}
                                        height={44}
                                    />
                                )}
                            </div>
                            <div className="pinned-message-custom__attachment_wrapper-title">
                                <div className="pinned-message-custom__attachment_title">
                                    {attachment.title}
                                </div>
                                <div className="pinned-message-custom__attachment_subtitle">
                                    {pinnedMessage.text
                                        ? pinnedMessage.text
                                        : type}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}
                    {/*<ArrowRight color='white' width='24px' height='24px' />*/}
                </Link>
            ))}
        </>
    );
};

export default PinnedMessageCustom;
