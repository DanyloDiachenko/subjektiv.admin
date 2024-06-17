"use client";

import styles from "./styles.module.scss";
import { ArtworkPostsTableProps } from "./module.props";
import {
    ArtworkPostItemDto,
    ArtworkPostType,
} from "@/submodules/common-dto/api-client/main";
import { sliceTitle } from "@/helpers/sliceTitle";
import Image from "next/image";
import Link from "next/link";
import { getUserImage } from "@/helpers/getUserImage";
import Pagination from "@/components/UI/Pagination";
import { useEffect, useState } from "react";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import apiClient from "@/api/apiClient";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import { NothingFound } from "@/components/NothingFound";
import { formatDate } from "@/helpers/formatDate";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { Select } from "@/components/UI/Select";
import { TotalItems } from "@/components/UI/TotalItems";
import { formatEnumValue } from "@/helpers/formatEnumValue";

const postsQuantityPerPageVariants: ISelectVariant[] = [
    {
        title: "10",
        value: "10",
    },
    {
        title: "20",
        value: "20",
    },
    {
        title: "50",
        value: "50",
    },
    {
        title: "100",
        value: "100",
    },
];

const typeVariants = Object.keys(ArtworkPostType).map((key) => ({
    title:
        key.charAt(0).toUpperCase() +
        key.slice(1, key.length).toLocaleLowerCase(),
    value: ArtworkPostType[key as keyof typeof ArtworkPostType],
}));

export const PostsTable = ({
    postsResponse,
}: ArtworkPostsTableProps): JSX.Element => {
    const [postsQuantityPerPage, setPostsQuantityPerPage] =
        useState<ISelectVariant>(postsQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(postsResponse.total);
    const [totalPages, setTotalPages] = useState<number>(
        postsResponse.total_pages,
    );
    const [posts, setPosts] = useState<ArtworkPostItemDto[]>(
        postsResponse.items,
    );
    const [search, setSearch] = useState<string>("");
    const [type, setType] = useState<ISelectVariant>(null);

    const getPosts = async (updatedPage?: number) => {
        try {
            const response =
                await apiClient.main.artworkPost.artworkPostControllerGetPosts({
                    page: updatedPage ? updatedPage : currentPage,
                    postTypes: type
                        ? [type.value as ArtworkPostType]
                        : undefined,
                    /* search: search.length > 3 ? search : undefined, */
                });

            setPosts(response.items);
            setTotalPages(response.total_pages);
            setTotal(response.total);
        } catch (error) {
            console.log("error getting posts", error);
        }
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

    useEffect(() => {
        getPosts();
    }, [currentPage]);

    useEffect(() => {
        getPosts(1);
    }, [type]);

    return (
        <>
            <div className="card-header border-0 pt-6">
                <div className="card-title">
                    <div className="d-flex align-items-center position-relative my-1">
                        <Image
                            className="position-absolute ms-5"
                            src="/media/search.svg"
                            alt="search"
                            width={14}
                            height={18}
                        />
                        <input
                            type="text"
                            className="form-control form-control-solid w-250px ps-13"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <TotalItems number={total} />
                    </div>
                </div>
                <div className={`card-toolbar ${styles.cardToolbal}`}>
                    <div className={`${styles.wrapper}`}>
                        <Select
                            placeholder="Type"
                            activeVariant={type}
                            setActiveVariant={setType}
                            variants={typeVariants}
                            className={styles.type}
                        />
                    </div>
                </div>
            </div>
            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th>POST ID</th>
                            <td>AUTHOR</td>
                            <td>ARTWORK</td>
                            <th>TYPE</th>
                            <th>ATTACHMETNS</th>
                            <th>IS PUBLIC</th>
                            <th>PUBLISH DATE</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {posts.length
                            ? posts.map((post, index) => (
                                  <tr key={index}>
                                      <td>
                                          <Link
                                              href={"/artwork-posts/" + post.id}
                                              className={styles.linkTitle}
                                          >
                                              {post.id}
                                          </Link>
                                      </td>
                                      <td>
                                          <Link
                                              className={`${styles.author} ${styles.linkTitle}`}
                                              href={"/users/" + post.author.id}
                                          >
                                              <Image
                                                  src={getUserImage(
                                                      post.author.avatar_id,
                                                  )}
                                                  alt="author"
                                                  width={50}
                                                  height={50}
                                              />
                                              <span
                                                  className={
                                                      styles.titleAvailable
                                                  }
                                              >
                                                  {sliceTitle(
                                                      post.author.first_name ||
                                                          "",
                                                      10,
                                                  )}{" "}
                                                  {sliceTitle(
                                                      post.author.last_name ||
                                                          "",
                                                      10,
                                                  )}
                                              </span>
                                          </Link>
                                      </td>
                                      <td className={styles.artwork}>
                                          <Link
                                              href={
                                                  "/artworks/" + post.artwork.id
                                              }
                                              className={`${styles.linkTitle} ${styles.artwork}`}
                                          >
                                              <Image
                                                  src={getArtworkImage(
                                                      post.artwork.id,
                                                      post.artwork.main_image
                                                          ?.image_id,
                                                  )}
                                                  width={50}
                                                  height={50}
                                                  alt="artwork"
                                              />
                                              <span>
                                                  {sliceTitle(
                                                      post.artwork.title || "",
                                                      25,
                                                  )}
                                              </span>
                                          </Link>
                                      </td>
                                      <td>{formatEnumValue(post.post_type)}</td>
                                      <td>
                                          {post.post_attachments.length ? (
                                              <div
                                                  className={styles.attachments}
                                              >
                                                  <Image
                                                      key={index}
                                                      width={32}
                                                      height={32}
                                                      alt=""
                                                      src={returnPostImage(
                                                          post,
                                                      )}
                                                  />
                                                  {post.post_attachments
                                                      .length > 1 &&
                                                      `${
                                                          post.post_attachments
                                                              .length - 1
                                                      } media${
                                                          post.post_attachments
                                                              .length -
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
                                      <td>
                                          {post.is_public
                                              ? "Public"
                                              : "Not Public"}
                                      </td>
                                      <td>{formatDate(post.publish_date)}</td>
                                  </tr>
                              ))
                            : ""}
                    </tbody>
                </table>
            </div>
            {!posts.length && <NothingFound />}
            <div className={styles.bottomContent}>
                <div>
                    <QuantitySelector
                        quantityPerPage={postsQuantityPerPage}
                        setQuantityPerPage={setPostsQuantityPerPage}
                        quantityPerPageVariants={postsQuantityPerPageVariants}
                    />
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};
