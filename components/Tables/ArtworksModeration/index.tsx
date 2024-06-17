import Image from "next/image";
import { connect } from "react-redux";

import styles from "./artworks.module.scss";
import { QuantitySelector } from "@/components/UI/QuantitySelector";
import Pagination from "@/components/UI/Pagination";
import { renderStatus } from "./renderStatus";
import { ArtworksModerationTableProps } from "./module.props";
import { formatDate } from "@/helpers/formatDate";
import { sliceTitle } from "@/helpers/sliceTitle";
import { Tooltip } from "@/components/UI/Tootip";
import { IRootState } from "@/store";
import { NothingFound } from "@/components/NothingFound";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { formatEnumValue } from "@/helpers/formatEnumValue";
import Link from "next/link";
import { getUserImage } from "@/helpers/getUserImage";

const ArtworksModerationTableComponent = ({
    onArtworkClick,
    artworks,
    artworksQuantityPerPage,
    setArworksQuantityPerPage,
    setCurrentPage,
    currentPage,
    totalPages,
    artworksQuantityPerPageVariants,
    setOpenPopup,
    artworksToModerate,
    setArtworksToModerate,
}: ArtworksModerationTableProps): JSX.Element => {
    const onArtworkClickHandler = (artworkId: number) => {
        setArtworksToModerate([artworkId]);
        onArtworkClick(artworkId);
        setOpenPopup("moderateArtwork");
    };

    const toggleSelectAll = () => {
        if (artworksToModerate.length === artworks.length) {
            setArtworksToModerate([]);
        } else {
            const allArtworkIds = artworks.map((artwork) => artwork.id);
            setArtworksToModerate(allArtworkIds);
        }
    };

    const toggleArtworkSelection = (artworkId: number) => {
        const isSelected = artworksToModerate.includes(artworkId);
        if (isSelected) {
            setArtworksToModerate(
                artworksToModerate.filter((id) => id !== artworkId),
            );
        } else {
            setArtworksToModerate([...artworksToModerate, artworkId]);
        }
    };

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thCheckbox}>
                                <input
                                    type="checkbox"
                                    onChange={toggleSelectAll}
                                    checked={
                                        artworks.length > 0 &&
                                        artworks.length ===
                                            artworksToModerate.length
                                    }
                                />
                            </th>
                            <th className={styles.thArtworkId}>ARTWORK ID</th>
                            <th className={styles.thArtwork}>ARTWORK</th>
                            <th className={styles.thCategory}>CATEGORY</th>
                            <th className={styles.thModerationStatus}>
                                MODERATION
                                <br /> STATUS
                            </th>
                            <th className={styles.thAuthorId}>AUTHOR</th>
                            <th className={styles.thPrice}>PRICE</th>
                            <th className={styles.thDateSubmission}>
                                DATE OF SUBMISSION
                            </th>
                            <th className={styles.thLastActivity}>
                                LAST ACTIVITY
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {artworks.map((artwork, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={artworksToModerate.includes(
                                            artwork.id,
                                        )}
                                        onChange={() =>
                                            toggleArtworkSelection(artwork.id)
                                        }
                                    />
                                </td>
                                <td>
                                    <div
                                        onClick={() =>
                                            onArtworkClickHandler(artwork.id)
                                        }
                                        className={styles.linkTitle}
                                    >
                                        {artwork.id}
                                    </div>
                                </td>
                                <td
                                    className={`d-flex align-items-center ${styles.avatarNameTd}`}
                                >
                                    <div className="symbol overflow-hidden me-3">
                                        <Image
                                            src={getArtworkImage(
                                                artwork.id,
                                                artwork.main_image?.image_id,
                                            )}
                                            width={50}
                                            height={50}
                                            alt="artwork"
                                        />
                                    </div>

                                    <div
                                        className="d-flex"
                                        onClick={() =>
                                            onArtworkClickHandler(artwork.id)
                                        }
                                    >
                                        <div className={styles.linkTitle}>
                                            {sliceTitle(
                                                artwork.title || "",
                                                25,
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {artwork.category &&
                                        formatEnumValue(artwork.category.title)}
                                </td>
                                <td>{renderStatus(artwork)}</td>
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
                                                artwork.owner.first_name || "",
                                                10,
                                            )}{" "}
                                            {sliceTitle(
                                                artwork.owner.last_name || "",
                                                10,
                                            )}
                                        </div>
                                    </Link>
                                </td>
                                <td>€{(artwork.price / 100).toFixed(2)}</td>
                                <td>
                                    {artwork.moderated_at
                                        ? formatDate(artwork.moderated_at)
                                        : ""}
                                </td>
                                <td>{formatDate(artwork.updated_at)}</td>
                            </tr>
                        ))}
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

const mapState = (state: IRootState) => ({
    artworksToModerate: state.artworksToModerate.artworksToModerate,
});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
    setArtworksToModerate: (artworksToModerate: number[]) => ({
        type: "SET_ARTWORKS_TO_MODERATE",
        artworksToModerate,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworksModerationTable = connector(
    ArtworksModerationTableComponent,
);
