"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import apiClient from "@/api/apiClient";
import UploadFile from "./UploadFile";
import {
    ArtworkPostTypesAllowedForUser,
    AttachmentImageDto,
    AttachmentType,
    AttachmentVideoDto,
    MainArtworkPostPutRequestDto,
} from "@/submodules/common-dto/api-client/main";
import {
    ImageKindEnum,
    ImageRatioEnum,
} from "@/submodules/common-dto/api-client/storage";
import { IPostAttachmentsStore } from "@/store/postAttachments/initStore";
import { ArtworkPostsPopupProps } from "./popup.props";
import { Button } from "@/components/UI/Button";
import { IArtworkStore } from "@/store/artwork/initStore";
import { Input } from "@/components/UI/Input";
import { Select } from "@/components/UI/Select";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";

const ArtworkPostsComponent = ({
    closePopup,
    postAttachments,
    setPostAttachments,
    postId,
    artworkId,
    postText,
    setPostText,
    setPostEventId,
    postEventId,
    setPostPublishDate,
    postPublishDate,
}: ArtworkPostsPopupProps) => {
    const [events, setEvents] = useState<ISelectVariant[]>([]);
    const [isCurrentTimeSelected, setIsCurrentTimeSelected] = useState(false);

    const getEvents = async () => {
        try {
            const data = await apiClient.main.event.eventControllerGetEvents({
                page: -1,
            });
            const dataRefactored = data.items.map((event) => ({
                title: event.title,
                value: event.id.toString(),
            }));
            setEvents(dataRefactored);
        } catch (error) {
            console.log(error);
        }
    };

    const returnActiveVariant = () => {
        return events.find((event) => Number(event?.value) === postEventId);
    };

    const uploadFile = async (files: FileList | File) => {
        const fileList = files instanceof FileList ? files : [files];
        const maxCountFiles = 10 - postAttachments.length;
        const arrayTenFiles: File[] = [];

        const newAttachments =
            postAttachments.length > 0 ? [...postAttachments] : [];

        for (let i = 0; i < Math.min(fileList.length, maxCountFiles); i++) {
            arrayTenFiles.push(fileList[i]);
            newAttachments.push({
                status: `Loading-${i}`,
                type: AttachmentType.IMAGE,
                additional_data: {} as AttachmentImageDto,
            });
        }
        setPostAttachments([...newAttachments]);

        for (const [i, file] of arrayTenFiles.entries()) {
            if (file.type.includes("video")) {
                setTimeout(async () => {
                    const index = newAttachments.findIndex(
                        (item) => item.status === `Loading-${i}`,
                    );
                    try {
                        const response =
                            await apiClient.storage.storage.storageControllerUploadVideo(
                                {
                                    place: "artwork/" + artworkId,
                                    formData: { file },
                                },
                            );

                        if (index !== -1) {
                            (newAttachments[index] = {
                                type: AttachmentType.VIDEO,
                                status: "success-video",
                                additional_data: response.data,
                            }),
                                setPostAttachments([...newAttachments]);
                        }
                    } catch (error) {
                        console.error("error load video:", error);
                        (newAttachments[index] = {
                            type: AttachmentType.IMAGE,
                            status: "Error - File is too large. Max 500 MB.",
                            additional_data: {} as AttachmentImageDto,
                        }),
                            setPostAttachments([...newAttachments]);
                        setTimeout(() => {
                            setPostAttachments(
                                newAttachments.filter(
                                    (attachment, i) => i !== index,
                                ),
                            );
                        }, 6000);
                    }
                }, 3000);
            } else if (file.type.includes("image")) {
                try {
                    const response =
                        await apiClient.storage.storage.storageControllerUpload(
                            {
                                place: "artwork/" + artworkId,
                                formData: { file },
                                kind: ImageKindEnum.ARTWORK_IMAGE,
                                ratio: ImageRatioEnum.RATIO_1_1,
                            },
                        );

                    const index = newAttachments.findIndex(
                        (item) => item.status === `Loading-${i}`,
                    );
                    if (index !== -1) {
                        (newAttachments[index] = {
                            type: AttachmentType.IMAGE,
                            additional_data: response.data,
                            status: "success-image",
                        }),
                            setPostAttachments([...newAttachments]);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
    };

    const myLoader = ({ src }: { src: string }) => {
        return src;
    };

    const deleteAttachments = (imageId: string, type: string) => {
        const currentAttachments = [...postAttachments];

        if (type === "video") {
            const updatedVideo = currentAttachments.filter((video) => {
                const thumbnailsVideo =
                    video.additional_data as AttachmentVideoDto;
                return thumbnailsVideo.file_id !== imageId;
            });
            setPostAttachments([...updatedVideo]);
        } else if (type === "image") {
            const updatedImages = currentAttachments.filter((image) => {
                const newVariant = image.additional_data as AttachmentImageDto;
                return newVariant.image_id !== imageId;
            });
            setPostAttachments([...updatedImages]);
        }
    };

    const submit = async () => {
        try {
            const requestBody: MainArtworkPostPutRequestDto = {
                post_attachments: postAttachments,
                text: postText,
                type:
                    postEventId === -1
                        ? ArtworkPostTypesAllowedForUser.EVENT
                        : undefined,
                publish_date: postPublishDate,
                additional_data: {
                    event_id: postEventId,
                },
            };

            if (postEventId !== -1) {
                requestBody.additional_data = { event_id: postEventId };
            }

            await apiClient.main.artworkPost.artworkPostControllerPutId({
                id: postId,
                requestBody: requestBody,
            });

            closePopup();
            setPostAttachments([]);

            location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const setPostPublishDateHandler = () => {
        setPostPublishDate(new Date().toISOString());
        setIsCurrentTimeSelected(true);
    };

    useEffect(() => {
        setPostEventId(-1);
    }, [postPublishDate]);

    const discard = () => {
        setPostAttachments([]);
        closePopup();
    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <>
            <div className={styles.popupBg} onClick={closePopup}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Post</div>
                    <button className={styles.buttonClose} onClick={closePopup}>
                        <img
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    <label htmlFor="postText" className={styles.label}>
                        <div className={styles.inputTitle}>Post Text</div>
                        <Input
                            className={styles.input}
                            placeholder="Post Text"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </label>
                    <label htmlFor="postEvent" className={styles.label}>
                        <div className={styles.inputTitle}>Post Event</div>
                        <Select
                            placeholder="Choose event"
                            variants={events}
                            setActiveVariant={(variant) => {
                                setPostEventId(Number(variant?.value));
                            }}
                            activeVariant={
                                returnActiveVariant() as ISelectVariant
                            }
                            className={styles.select}
                            isRemoveArrow={false}
                        />
                    </label>
                    <label htmlFor="publishDate" className={styles.label}>
                        <div className={styles.inputTitle}>Publish Date</div>
                        <DatePicker
                            selected={
                                postPublishDate
                                    ? new Date(postPublishDate)
                                    : undefined
                            }
                            dateFormat="d MMM yyyy, h:mm aa"
                            onChange={(date) => {
                                setPostPublishDate(
                                    date
                                        ? new Date(date).toISOString()
                                        : undefined,
                                );
                            }}
                            className={styles.datePicker}
                            showTimeSelect
                        />
                        <Button
                            appearance="grey"
                            onClick={setPostPublishDateHandler}
                            className={`${styles.buttonCurrentTime} ${isCurrentTimeSelected ? styles.currentTimeSelected : ""}`}
                        >
                            Set Current Time
                        </Button>
                    </label>
                    <div
                        className={`event-step-two__media ${
                            postAttachments.length > 0 ? "block" : "hidden"
                        }`}
                    >
                        <div className="d-flex justify-content-between">
                            <div className={styles.title}>Attachments</div>
                            <div>{postAttachments.length}/10</div>
                        </div>
                        <p className={styles.description}>
                            Supports: png, jpeg, gif, webp, m4v, mov, mp4
                        </p>
                        <p className={styles.description}>
                            Maximum file size: 500 Mb
                        </p>
                        <div className={styles.images}>
                            {postAttachments?.length ? (
                                (
                                    postAttachments as IPostAttachmentsStore["postAttachments"]
                                )
                                    .reverse()
                                    .sort((a, b) => {
                                        if (
                                            a.type === AttachmentType.VIDEO &&
                                            b.type === AttachmentType.IMAGE
                                        ) {
                                            return -1;
                                        } else if (
                                            a.type === AttachmentType.IMAGE &&
                                            b.type === AttachmentType.VIDEO
                                        ) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    })
                                    .map((attachment, index) => {
                                        if (
                                            attachment.status &&
                                            attachment.status.includes("Error")
                                        ) {
                                            return (
                                                <div
                                                    key={Math.random()}
                                                    className={` event-step-two__img-${
                                                        index + 1
                                                    }  flex h-full  items-center justify-center  border-[0.5px]  border-primary-black-10 bg-error-color text-center text-xs text-white`}
                                                >
                                                    {attachment.status}
                                                </div>
                                            );
                                        } else if (
                                            attachment.status &&
                                            attachment.status.includes(
                                                "Loading",
                                            )
                                        ) {
                                            return (
                                                <div
                                                    key={Math.random()}
                                                    className={` event-step-two__img-${
                                                        index + 1
                                                    }  flex h-full  items-center justify-center border-[0.5px] border-primary-black-10 bg-primary-white-10`}
                                                >
                                                    loading
                                                </div>
                                            );
                                        } else if (
                                            attachment.status ===
                                                "success-video" ||
                                            attachment.type ===
                                                AttachmentType.VIDEO
                                        ) {
                                            const thumbnailsVideo =
                                                attachment.additional_data as AttachmentVideoDto;
                                            const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${thumbnailsVideo.thumbnails.small}`;

                                            return (
                                                <div
                                                    key={Math.random()}
                                                    className={
                                                        styles.imageWrapper
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            styles.playIcon
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                        >
                                                            <path
                                                                d="M3 16.2372C3 17.6141 4.5479 18.4578 5.75015 17.7361L16.1413 11.499C17.2862 10.8117 17.2862 9.18832 16.1413 8.50105L5.75015 2.26387C4.5479 1.54223 3 2.3859 3 3.76282V16.2372Z"
                                                                fill="white"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <Image
                                                        loader={myLoader}
                                                        src={url}
                                                        alt="artwork"
                                                        width={400}
                                                        height={400}
                                                        className="h-full object-cover object-center"
                                                    />
                                                    <button
                                                        className={`${styles.clearButton}`}
                                                        onClick={() =>
                                                            deleteAttachments(
                                                                thumbnailsVideo.file_id,
                                                                "video",
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            src="/media/close-image-profile.svg"
                                                            alt="clear user photo"
                                                            width="16"
                                                            height="16"
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        } else if (
                                            (attachment.status &&
                                                attachment.status ===
                                                    "success-image") ||
                                            attachment.type ===
                                                AttachmentType.IMAGE
                                        ) {
                                            const newVariant =
                                                attachment.additional_data as AttachmentImageDto;
                                            const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${newVariant.sizes.small}`;
                                            return (
                                                <div
                                                    key={Math.random()}
                                                    className={
                                                        styles.imageWrapper
                                                    }
                                                >
                                                    <Image
                                                        loader={myLoader}
                                                        src={url}
                                                        alt="artwork"
                                                        width={400}
                                                        height={400}
                                                        className="h-full object-cover object-center"
                                                    />
                                                    <button
                                                        className={`${styles.clearButton}`}
                                                        onClick={() =>
                                                            deleteAttachments(
                                                                newVariant.image_id,
                                                                "image",
                                                            )
                                                        }
                                                    >
                                                        <Image
                                                            src="/media/close-image-profile.svg"
                                                            alt="clear user photo"
                                                            width="16"
                                                            height="16"
                                                        />
                                                    </button>
                                                </div>
                                            );
                                        } else {
                                            return <></>;
                                        }
                                    })
                            ) : (
                                <></>
                            )}
                            {postAttachments.length === 10 ? (
                                <></>
                            ) : (
                                <UploadFile
                                    onChange={async (file) => uploadFile(file)}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.error}></div>
                    <div className={styles.buttons}>
                        <Button appearance="grey" onClick={discard}>
                            Discard
                        </Button>
                        <Button appearance="blue" onClick={submit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapState = (state: {
    postAttachments: IPostAttachmentsStore;
    postId: IPostAttachmentsStore;
    artwork: IArtworkStore;
}) => {
    return {
        postAttachments: state.postAttachments.postAttachments,
        postId: state.postAttachments.postId,
        artworkId: state.artwork.artwork.id,
        postText: state.postAttachments.postText,
        postEventId: state.postAttachments.postEventId,
        postPublishDate: state.postAttachments.postPublishDate,
    };
};

const mapDispatch = {
    setPostAttachments: (
        postAttachments: IPostAttachmentsStore["postAttachments"],
    ) => ({
        type: "SET_POST_ATTACHMENTS",
        postAttachments,
    }),
    closePopup: () => ({
        type: "CLOSE_POPUP",
    }),
    setPostText: (postText: string) => ({
        type: "SET_POST_TEXT",
        postText,
    }),
    setPostEventId: (postEventId: number) => ({
        type: "SET_POST_EVENTID",
        postEventId,
    }),
    setPostPublishDate: (postPublishDate: string | undefined) => ({
        type: "SET_POST_PUBLISH_DATE",
        postPublishDate,
    }),
};

const connector = connect(mapState, mapDispatch);
export const ArtworkPostsPopup = connector(ArtworkPostsComponent);
