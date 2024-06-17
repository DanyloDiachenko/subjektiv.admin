import { useSearchParams } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import { Channel, ChannelSort, StreamChat } from "stream-chat";
import {
    ChannelList,
    ChannelSearchFunctionParams,
    useChatContext,
} from "stream-chat-react";
import { DefaultStreamChatGenerics } from "stream-chat-react/dist/types/types";

import apiClient from "@/api/apiClient";
import imageService from "@/api/imageService";
import MessagingChannelPreview from "@/components/messages/MessagingChannelPreview";
import { checkChannelExistence } from "@/components/messages/MessagingSidebar/newChannel";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { ArrowRight } from "@/components/Popups/ModerateArtwork/ArrowRight";

const tTabs = [
    {
        id: 1,
        title: "All",
        type: "all",
    },
    {
        id: 2,
        title: "Orders",
        type: "orders",
    },

    {
        id: 3,
        title: `Review`,
        type: "review",
    },
];

interface IArtworkMessageData {
    artworkId: number;
    imageId: string;
    title: string;
}

const MessagingSidebar = () => {
    const userMeChatId = process.env.NEXT_PUBLIC_SUPPORT_ADMIN_CHAT_ID ?? "";
    const searchParameters = useSearchParams();
    const userChatId = searchParameters.get("id");
    const artworkId = searchParameters.get("art");
    const orderId = searchParameters.get("ord");

    const { client, setActiveChannel } = useChatContext();

    const [artworkData, setArtworkData] = useState<IArtworkMessageData>();
    const [channelId, setChannelId] = useState<string | null | undefined>();

    const [activeTab, _] = useState(orderId ? tTabs[1] : tTabs[0]);
    const [openChanelList, setOpenChanelList] = useState(false);
    const [userChannelReferences, setUserChannelReferences] = useState<{
        [key: string]: boolean;
    } | null>(null);

    const filters =
        activeTab.type === "all"
            ? {
                  // type: 'orders',
                  members: { $in: [userMeChatId] },
              }
            : {
                  type: activeTab.type,
                  members: { $in: [userMeChatId] },
              };

    const sort = { last_message_at: -1 } as
        | ChannelSort<DefaultStreamChatGenerics>
        | undefined;

    const options = { limit: 10 };
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (client) {
            setTimeout(() => {
                userChatId &&
                    client.state.userChannelReferences[userChatId] &&
                    Object.keys(client.state.userChannelReferences[userChatId])
                        .length > 0 &&
                    setUserChannelReferences(
                        client.state.userChannelReferences[userChatId],
                    );
                setIsLoading(false);
            }, 1000);
        }
    }, [client, userChatId]);

    useEffect(() => {
        artworkId &&
            void apiClient.main.artwork
                .artworkControllerGetArtwork({
                    id: Number(artworkId),
                })
                .then((data) =>
                    setArtworkData({
                        artworkId: data.id,
                        imageId: data.main_image?.image_id
                            ? data.main_image?.image_id
                            : "",
                        title: data.title ? data.title : "",
                    }),
                );
        orderId &&
            void apiClient.main.artworkOrder
                .artworkOrderControllerGetById({
                    id: Number(orderId),
                })
                .then((data) => {
                    setArtworkData({
                        artworkId: data.artwork.id,
                        imageId: data.artwork.main_image?.image_id
                            ? data.artwork.main_image?.image_id
                            : "",
                        title: data.artwork.title ? data.artwork.title : "",
                    });
                });
        if (!isLoading) {
            setChannelId(
                userChatId && userChannelReferences
                    ? checkChannelExistence(userChannelReferences, {
                          isOrder: !!orderId,
                          orderId: orderId ?? undefined,
                          artworkId: artworkId ?? undefined,
                          userChatId: userChatId,
                          userMeChatId: userMeChatId,
                      })
                    : undefined,
            );
        }
    }, [artworkId, userChannelReferences, isLoading]);

    useEffect(() => {
        const imageUrl = artworkData
            ? imageService.getUrl(
                  ImageTargetEnum.Artwork,
                  {
                      artworkId: artworkData.artworkId,
                  },
                  artworkData.imageId,
                  "medium",
              )
            : undefined;

        const sendMessage = async () => {
            if (!isLoading && channelId !== null) {
                const channelUsers =
                    client &&
                    client.channel(
                        orderId ? "orders" : "messaging",
                        channelId
                            ? channelId
                            : userChatId &&
                                  `${userMeChatId}-${userChatId}${
                                      artworkId
                                          ? "-" + artworkId
                                          : orderId
                                            ? "-" + orderId
                                            : ""
                                  }`,

                        {
                            members: [userChatId ?? "", userMeChatId],
                        },
                    );
                channelUsers && (await channelUsers.watch());

                channelId === undefined &&
                    artworkData &&
                    imageUrl &&
                    channelUsers &&
                    (await channelUsers.sendMessage({
                        pinned: true,
                        text: orderId ? `Order No. ${orderId}` : "",
                        attachments:
                            channelId === undefined && artworkData && imageUrl
                                ? [
                                      {
                                          type: "image",
                                          image_url: imageUrl,
                                          title: `Artwork - ${artworkData.title}`,
                                          og_scrape_url: `${
                                              process.env.NEXT_PUBLIC_SITE_URL
                                          }/${
                                              orderId
                                                  ? `orders/${orderId}`
                                                  : `artworks/${artworkData.artworkId}`
                                          } `,
                                      },
                                  ]
                                : [],
                    }));
            }
        };

        !isLoading &&
            channelId !== null &&
            sendMessage().finally(() => {
                setActiveChannel(
                    client.channel(
                        orderId ? "orders" : "messaging",
                        channelId
                            ? channelId
                            : `${userMeChatId}-${userChatId}${
                                  artworkId
                                      ? "-" + artworkId
                                      : orderId
                                        ? "-" + orderId
                                        : ""
                              }`,
                    ),
                );

                // setIsOnMessage(true);
                window.history.replaceState(null, "", "/messages");
            });
    }, [artworkData, channelId]);

    const customSearchFunction = async (
        props: ChannelSearchFunctionParams,
        event: { target: { value: SetStateAction<string> } },
        client: StreamChat,
    ) => {
        const { setResults, setSearching, setQuery } = props;
        const userName = String(event.target.value);

        const filters = {
            members: { $in: [userMeChatId] },
        };

        setSearching(true);
        setQuery(userName);

        try {
            const channels: Channel[] = await client.queryChannels(
                filters,
                { last_message_at: -1 },
                {
                    watch: true,
                    state: true,
                },
            );

            // Фильтруем результаты на стороне клиента, проверяя имя пользователя
            const filteredChannels = channels.filter((channel) =>
                Object.values(channel.state.members).some((member) =>
                    member
                        .user!.name!.toLowerCase()
                        .includes(userName.toLowerCase()),
                ),
            );

            setResults(filteredChannels);
        } catch (error) {
            console.error("Error search channel:", error);
        } finally {
            setSearching(false);
        }
    };

    console.log("userChatId", userChatId);
    console.log("userChannelReferences", userChannelReferences);
    console.log("channelId", channelId);
    return (
        <div
            className={`chat-messaging_chanelList ${
                openChanelList && "chanelList__openMob"
            }`}
        >
            <div className="chat-messaging_chanelList__header">
                <div
                    className={`chat-messaging_chanelList__btn-open ${
                        openChanelList ? "open-list" : "close-list"
                    }`}
                    onClick={() => setOpenChanelList(!openChanelList)}
                >
                    <ArrowRight isActive={true} />
                    {/*<ArrowRight left={openChanelList} color={'white'} />*/}
                </div>
                <h1 className="chat-messaging_chanelList__title ">Messages</h1>
                {/*<MessagesTab*/}
                {/*    tabs={tTabs}*/}
                {/*    activeTab={activeTab}*/}
                {/*    onChangeTab={(type) =>*/}
                {/*        setActiveTab(*/}
                {/*            type*/}
                {/*                ? tTabs.find((tab) => tab.type === type) ||*/}
                {/*                      tTabs[0]*/}
                {/*                : tTabs[0],*/}
                {/*        )*/}
                {/*    }*/}
                {/*/>*/}
                <div className="lines__line  " />
                {isLoading && (
                    <div className="absolute ps-6 text-primary-white-60">
                        loading...
                    </div>
                )}
            </div>

            <ChannelList
                additionalChannelSearchProps={{
                    searchFunction: async (parameters, event) => {
                        return customSearchFunction(parameters, event, client);
                    },
                }}
                showChannelSearch
                filters={filters}
                options={options}
                sort={sort}
                Preview={(props) => (
                    <MessagingChannelPreview
                        {...props}
                        onClick={() => setOpenChanelList(false)}
                    />
                )}
            />
        </div>
    );
};

export default MessagingSidebar;
