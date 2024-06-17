import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "./artworks.module.scss";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import Pagination from "@/components/UI/Pagination";
import { renderStatus } from "./renderStatus";
import { ArtworksTableProps } from "./artworks.props";
import { sliceTitle } from "@/helpers/sliceTitle";
import { Tooltip } from "@/components/UI/Tootip";
import { NothingFound } from "@/components/NothingFound";
import { formatDate } from "@/helpers/formatDate";
import { getUserImage } from "@/helpers/getUserImage";
import { SortOrder } from "@/submodules/common-dto/api-client/main";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { formatEnumValue } from "@/helpers/formatEnumValue";

export const ArtworksTableComponent = ({
    artworks,
    currentPage,
    setCurrentPage,
    totalPages,
    artworksQuantityPerPage,
    artworksQuantityPerPageVariants,
    setArworksQuantityPerPage,
    onThClick,
}: ArtworksTableProps): JSX.Element => {
    const [sort, setSort] = useState<{
        field: "id" | "title" | undefined;
        order: SortOrder | undefined;
    }>({
        field: undefined,
        order: undefined,
    });

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thArtworkId}>
                                <div className={styles.arrowContent}>
                                    <span
                                        onClick={() => {
                                            setSort({
                                                order:
                                                    sort.order === SortOrder.ASC
                                                        ? SortOrder.DESC
                                                        : SortOrder.ASC,
                                                field: "id",
                                            });
                                            onThClick(
                                                "id",
                                                sort.order === SortOrder.ASC
                                                    ? SortOrder.DESC
                                                    : SortOrder.ASC,
                                            );
                                        }}
                                    >
                                        ARTWORK ID
                                    </span>
                                    <div className={styles.arrows}>
                                        {sort.field === "id" &&
                                            sort.order === SortOrder.ASC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                />
                                            )}
                                        {sort.field === "id" &&
                                            sort.order === SortOrder.DESC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                    style={{
                                                        transform:
                                                            "rotate(180deg)",
                                                    }}
                                                />
                                            )}
                                    </div>
                                </div>
                            </th>
                            <th className={styles.thArtwork}>
                                <div className={styles.arrowContent}>
                                    <span
                                        onClick={() => {
                                            setSort({
                                                order:
                                                    sort.order === SortOrder.ASC
                                                        ? SortOrder.DESC
                                                        : SortOrder.ASC,
                                                field: "title",
                                            });
                                            onThClick(
                                                "title",
                                                sort.order === SortOrder.ASC
                                                    ? SortOrder.DESC
                                                    : SortOrder.ASC,
                                            );
                                        }}
                                    >
                                        ARTWORK
                                    </span>
                                    <div className={styles.arrows}>
                                        {sort.field === "title" &&
                                            sort.order === SortOrder.ASC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                />
                                            )}
                                        {sort.field === "title" &&
                                            sort.order === SortOrder.DESC && (
                                                <img
                                                    src="/media/arrow-top.svg"
                                                    alt="sort"
                                                    style={{
                                                        transform:
                                                            "rotate(180deg)",
                                                    }}
                                                />
                                            )}
                                    </div>
                                </div>
                            </th>
                            <th className={styles.thCategory}>CATEGORY</th>
                            <th className={styles.thOwnerId}>OWNER</th>
                            <th className={styles.thAuthorId}>AUTHOR</th>
                            <th className={styles.thPrice}>PRICE</th>
                            <th className={styles.thYear}>YEAR</th>
                            <th className={styles.thStatus}>
                                ARTWORK
                                <br />
                                STATUS
                            </th>
                            <th className={styles.thUpdate}>LAST UPDATE</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {artworks.length
                            ? artworks.map((artwork, index) => (
                                  <tr key={index}>
                                      <td>
                                          <Link
                                              href={"/artworks/" + artwork.id}
                                              className={styles.linkTitle}
                                          >
                                              {artwork.id}
                                          </Link>
                                      </td>
                                      <td
                                          className={`d-flex align-items-center ${styles.avatarNameTd}`}
                                      >
                                          <Link
                                              href={"/artworks/" + artwork.id}
                                              className="symbol symbol-circle symbol-50px overflow-hidden me-3"
                                          >
                                              <Image
                                                  src={getArtworkImage(
                                                      artwork.id,
                                                      artwork.main_image
                                                          ?.image_id,
                                                  )}
                                                  width={50}
                                                  height={50}
                                                  alt="artwork"
                                              />
                                          </Link>
                                          <div className="d-flex">
                                              <Link
                                                  href={
                                                      "/artworks/" + artwork.id
                                                  }
                                                  className={styles.linkTitle}
                                              >
                                                  {sliceTitle(
                                                      artwork.title || "",
                                                      25,
                                                  )}
                                              </Link>
                                          </div>
                                      </td>
                                      <td>
                                          {artwork.category &&
                                              formatEnumValue(
                                                  artwork.category?.title,
                                              )}
                                      </td>
                                      <td className={styles.avatarNameTd}>
                                          <Link
                                              href={`/users/${artwork.owner.id}`}
                                              className={styles.avatar}
                                          >
                                              <img
                                                  src={getUserImage(
                                                      artwork.owner.avatar_id,
                                                  )}
                                                  alt="user`s avatar"
                                                  style={{
                                                      background: "#393945",
                                                  }}
                                              />
                                              <div>
                                                  {sliceTitle(
                                                      artwork.owner
                                                          .first_name || "",
                                                      10,
                                                  )}{" "}
                                                  {sliceTitle(
                                                      artwork.owner.last_name ||
                                                          "",
                                                      10,
                                                  )}
                                              </div>
                                          </Link>
                                      </td>
                                      <td className={styles.avatarNameTd}>
                                          <Link
                                              href={`/users/${artwork.author.id}`}
                                              className={styles.avatar}
                                          >
                                              <img
                                                  src={getUserImage(
                                                      artwork.author.avatar_id,
                                                  )}
                                                  alt="user`s avatar"
                                                  style={{
                                                      background: "#393945",
                                                  }}
                                              />
                                              <div>
                                                  {sliceTitle(
                                                      artwork.author
                                                          .first_name || "",
                                                      10,
                                                  )}{" "}
                                                  {sliceTitle(
                                                      artwork.author
                                                          .last_name || "",
                                                      10,
                                                  )}
                                              </div>
                                          </Link>
                                      </td>
                                      <td>
                                          €{(artwork.price / 100).toFixed(2)}
                                      </td>
                                      <td>{artwork.year}</td>
                                      <td>{renderStatus(artwork.status)}</td>
                                      <td>{formatDate(artwork.updated_at)}</td>
                                  </tr>
                              ))
                            : ""}
                    </tbody>
                </table>
            </div>
            {!artworks.length && <NothingFound />}
            <div className={styles.bottomContent}>
                <div>
                    <Tooltip id="tooltip-pagintaion" />
                    <div
                        data-tooltip-content="Currently doesn`t work"
                        data-tooltip-id="tooltip-pagintaion"
                    >
                        <QuantitySelector
                            quantityPerPage={artworksQuantityPerPage}
                            setQuantityPerPage={setArworksQuantityPerPage}
                            quantityPerPageVariants={
                                artworksQuantityPerPageVariants
                            }
                        />
                    </div>
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
