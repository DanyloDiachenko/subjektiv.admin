"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { ArtworkPostsTableProps } from "./module.props";
import {
    ArtworkPostItemDto,
    AttachmentPublicDto,
} from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import Image from "next/image";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import Link from "next/link";
import { Button } from "@/components/UI/Button";
import { connect } from "react-redux";
import { formatDate } from "@/helpers/formatDate";
import { formatEnumValue } from "@/helpers/formatEnumValue";

const ArtworkPostsTableComponent = ({
    postsResponse,
    setOpenPopup,
    setPostAttachments,
    setPostId,
    setPostText,
    setPostEventId,
    setPostPublishDate,
}: ArtworkPostsTableProps): JSX.Element => {
    const [posts, _] = useState<ArtworkPostItemDto[]>(postsResponse.items);
    /* const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(
        postsResponse.total_pages,
    ); */

    const returnAuthorPhoto = (imageId: string | null) => {
        if (imageId) {
            return imageService.getUrl(
                ImageTargetEnum.UserAvatar,
                null,
                imageId,
                "medium",
            );
        }

        return "/media/no-avatar.png";
    };

    const returnPostImage = (post: ArtworkPostItemDto) => {
        if ("type" in post.post_attachments[0]) {
            if (post.post_attachments[0].type === "video") {
                console.log(post.post_attachments[0].additional_data);
                return `${process.env.NEXT_PUBLIC_HOST_URL}/${
                    "thumbnails" in post.post_attachments[0].additional_data &&
                    post.post_attachments[0].additional_data.thumbnails.small
                }`;
            }

            if (post.post_attachments[0].type === "image") {
                return `${process.env.NEXT_PUBLIC_HOST_URL}/${
                    "sizes" in post.post_attachments[0].additional_data &&
                    post.post_attachments[0].additional_data.sizes.small
                }`;
            }
        }

        return "";
    };

    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th>ID</th>
                        <th>AUTHOR</th>
                        <th>POST ATTACHMENTS</th>
                        <th>TYPE</th>
                        <th>PUBLISH DATE</th>
                        <th>EDIT</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {posts.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <Link
                                    href={"/artwork-posts/" + post.id}
                                    className={styles.titleAvailable}
                                >
                                    {post.id}
                                </Link>
                            </td>
                            <td>
                                <Link
                                    className={styles.author}
                                    href={"/users/" + post.author.id}
                                >
                                    <Image
                                        src={returnAuthorPhoto(
                                            post.author.avatar_id,
                                        )}
                                        alt="author"
                                        width={32}
                                        height={32}
                                    />
                                    <span className={styles.titleAvailable}>
                                        {sliceTitle(
                                            post.author.first_name ||
                                                "" + post.author.last_name,
                                            20,
                                        )}
                                    </span>
                                </Link>
                            </td>
                            <td>
                                {post.post_attachments.length ? (
                                    <div className={styles.attachments}>
                                        <Image
                                            key={index}
                                            width={32}
                                            height={32}
                                            alt=""
                                            src={returnPostImage(post)}
                                        />
                                        {post.post_attachments.length > 1 &&
                                            `${
                                                post.post_attachments.length - 1
                                            } media${
                                                post.post_attachments.length -
                                                    1 ===
                                                1
                                                    ? ""
                                                    : "s"
                                            } more`}
                                    </div>
                                ) : (
                                    ""
                                )}
                            </td>
                            <td>{formatEnumValue(post.post_type)}</td>
                            <td>
                                {post.publish_date &&
                                    formatDate(post.publish_date)}
                            </td>
                            <td>
                                <Button
                                    appearance="lightBlue"
                                    className={styles.editButton}
                                    onClick={() => {
                                        setOpenPopup("artworkPosts");
                                        setPostAttachments(
                                            post.post_attachments,
                                        );
                                        setPostId(post.id);
                                        setPostEventId(
                                            post.additional_data?.event_id ||
                                                -1,
                                        );
                                        setPostText(post.text);
                                        setPostPublishDate(post.publish_date);
                                    }}
                                >
                                    <Image
                                        src="/media/edit.svg"
                                        alt="edit"
                                        width="20"
                                        height="20"
                                    />
                                    <span>Edit</span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
};

const connector = connect(mapState, mapDispatch);

export const ArtworkPostsTable = connector(ArtworkPostsTableComponent);
