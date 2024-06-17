"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { useState } from "react";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { EventDetailsProps } from "./module.props";
import { formatDate } from "@/helpers/formatDate";
import apiClient from "@/api/apiClient";
import {
    ArtworkPreviewWithAuthorDto,
    AttachmentPublicDto,
    AttachmentType,
    MainAdminArtworkGetIdResponseDto,
} from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { getUserImage } from "@/helpers/getUserImage";
import { Switch } from "../UI/Switch";

const PostDetailsComponent = ({
    post,
    setOpenPopup,
    setPostAttachments,
    setPostId,
    setPostText,
    setPostEventId,
    setPostPublishDate,
    setArtwork,
}: EventDetailsProps) => {
    const router = useRouter();

    const [isPostPublic, setIsPostPublic] = useState<boolean>(
        /* post.is_public */ true,
    );

    const deletePost = () => {
        try {
            apiClient.main.artworkPost.artworkPostControllerDeletePost({
                id: post.id,
            });

            router.push("/posts");
        } catch (error) {
            console.log(error);
        }
    };

    const postImages = post.post_attachments.filter(
        (post) => post.type === AttachmentType.IMAGE,
    );
    const postVideos = post.post_attachments.filter(
        (post) => post.type === AttachmentType.VIDEO,
    );

    const returnPostImage = (postImg: AttachmentPublicDto) => {
        return `${process.env.NEXT_PUBLIC_HOST_URL}/${
            "sizes" in postImg.additional_data &&
            postImg.additional_data.sizes.small
        }`;
    };
    const returnPostVideo = (postVideo: AttachmentPublicDto) => {
        console.log(postVideo);
        return `${process.env.NEXT_PUBLIC_HOST_URL}/${
            "variants" in postVideo.additional_data &&
            postVideo.additional_data.variants[0].path
        }`;
    };

    const onEditClick = () => {
        setOpenPopup("artworkPosts");
        setPostAttachments(post.post_attachments);
        setPostId(post.id);
        setPostEventId(post.additional_data?.event.id || -1);
        setPostText(post.text);
        setPostPublishDate(post.publish_date);
        setArtwork(post.artwork);
    };

    const onPostPublicChange = (isChecked: boolean) => {
        setIsPostPublic(isChecked);

        try {
            apiClient.main.artworkPost.artworkPostControllerPutId({
                id: post.id,
                requestBody: {
                    is_public: isChecked,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Details</h2>
                </div>

                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn ${styles.editButton}`}
                        onClick={onEditClick}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>Post ID</div>
                    <div className={styles.value}>{post.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Author ID</div>
                    <div className={styles.value}>
                        <Link
                            className={`${styles.author} ${styles.linkTitle}`}
                            href={"/users/" + post.author.id}
                        >
                            <Image
                                src={getUserImage(post.author.avatar_id)}
                                alt="author"
                                width={30}
                                height={30}
                            />
                            <span className={styles.titleAvailable}>
                                {sliceTitle(post.author.first_name || "", 10)}{" "}
                                {sliceTitle(post.author.last_name || "", 10)}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Arwork Id</div>
                    <div className={styles.value}>
                        <div className={styles.artwork}>
                            <Link
                                href={"/artworks/" + post.artwork.id}
                                className={`${styles.linkTitle} ${styles.artwork}`}
                            >
                                <Image
                                    src={getArtworkImage(
                                        post.artwork.id,
                                        post.artwork.main_image?.image_id,
                                    )}
                                    width={30}
                                    height={30}
                                    alt="artwork"
                                />
                                <span>
                                    {sliceTitle(post.artwork.title || "", 25)}
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Text</div>
                    <div className={styles.value}>{post.text}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Event ID</div>
                    <div className={styles.value}>
                        {post.additional_data &&
                            post.additional_data?.event && (
                                <Link
                                    href={`/events/${post.additional_data.event.id}`}
                                    className={styles.linkTitle}
                                >
                                    {post.additional_data.event.id}
                                </Link>
                            )}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Publish Date</div>
                    <div className={styles.value}>
                        {formatDate(post.publish_date)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Is Public</div>
                    <div className={styles.value}>
                        <Switch
                            isChecked={isPostPublic}
                            onChange={onPostPublicChange}
                        />
                    </div>
                </div>
                <div className={`${styles.item} ${styles.attachments}`}>
                    <div className={styles.label}>Post Attachments</div>
                    <div className={styles.value}>
                        {postImages.map((postImg, index) => (
                            <div key={index} className={styles.itemPost}>
                                <div className={styles.title}>Image</div>
                                <img
                                    key={index}
                                    src={returnPostImage(postImg)}
                                    alt="post image"
                                />
                            </div>
                        ))}
                        {postVideos.map((postVideo, index) => (
                            <div key={index} className={styles.itemPost}>
                                <div className={styles.title}>Video</div>
                                <video
                                    key={index}
                                    src={returnPostVideo(postVideo)}
                                    controls
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className={`${styles.item} ${styles.buttonItem}`}>
                    <Button
                        className={styles.button}
                        appearance="red"
                        onClick={deletePost}
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setPostAttachments: (postAttachments: AttachmentPublicDto[]) => ({
        type: "SET_POST_ATTACHMENTS",
        postAttachments,
    }),
    setPostId: (postId: number) => ({
        type: "SET_POST_ID",
        postId,
    }),
    setPostEventId: (postEventId: number) => ({
        type: "SET_POST_EVENTID",
        postEventId,
    }),
    setPostText: (postText: string) => ({
        type: "SET_POST_TEXT",
        postText,
    }),
    setPostPublishDate: (postPublishDate: string | undefined) => ({
        type: "SET_POST_PUBLISH_DATE",
        postPublishDate,
    }),
    setArtwork: (
        artwork: MainAdminArtworkGetIdResponseDto | ArtworkPreviewWithAuthorDto,
    ) => ({
        type: "SET_ARTWORK",
        artwork,
    }),
};

const connector = connect(mapState, mapDispatch);

export const PostDetails = connector(PostDetailsComponent);
