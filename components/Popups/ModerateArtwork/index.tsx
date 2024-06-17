"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI/Button";
import { ModerateArtworkPopupProps } from "./popup.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { ArrowLeft } from "./ArrowLeft";
import { ArrowRight } from "./ArrowRight";
import { sliceTitle } from "@/helpers/sliceTitle";
import { IRootState } from "@/store";

const reasons = [
    {
        title: "All Good (by default)",
        description: "Artwork meets all the requirements of the platform",
    },
    /* {
            title: 'Reject',
            description:
                'Reject reject reject reject reject reject reject reject reject reject',
        }, */
    {
        title: "Not public",
        description:
            "Artwork will not appear on timeline and catalog, but will be present on site",
    },
];

const ModerateArtworkPopupComponent = ({
    openPopup,
    closePopup,
    artwork,
    onReasonClick,
    confirm,
    totalArtworks,
    currentArtworkIndex,
    skip,
    setArtworksToModerate,
}: ModerateArtworkPopupProps): JSX.Element => {
    const router = useRouter();

    const returnArtworkImageIds = () => {
        const artworkImageIds: { imageId: string; index: number }[] = [];

        if (!artwork.artwork_images.length)
            return [
                {
                    imageId: "",
                    index: 0,
                },
            ];

        artwork.artwork_images.forEach((image, index) => {
            artworkImageIds.push({
                imageId: image.image_id,
                index: index,
            });
        });

        return artworkImageIds;
    };

    const [activeReasonTitle, setActiveReasonTitle] = useState<string>(
        reasons[0].title,
    );
    const [activeArtworkImageId, setActiveArtworkImageId] = useState<string>(
        returnArtworkImageIds()[0].imageId,
    );

    const returnAuthorImage = (imageId: string | null) => {
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

    const goToNextArtworkImage = () => {
        const artworkImageIds = returnArtworkImageIds();

        const currentArtworkImageIndex = artworkImageIds.findIndex(
            (image) => image.imageId === activeArtworkImageId,
        );

        if (currentArtworkImageIndex < artworkImageIds.length - 1) {
            setActiveArtworkImageId(
                artworkImageIds[currentArtworkImageIndex + 1].imageId,
            );
        }
    };
    const goToPrevArtworkImage = () => {
        const artworkImageIds = returnArtworkImageIds();

        const currentArtworkImageIndex = artworkImageIds.findIndex(
            (image) => image.imageId === activeArtworkImageId,
        );

        if (currentArtworkImageIndex > 0) {
            setActiveArtworkImageId(
                artworkImageIds[currentArtworkImageIndex - 1].imageId,
            );
        }
    };

    const onReasonClickHandler = (reasonTitle: string) => {
        setActiveReasonTitle(reasonTitle);
        onReasonClick(reasonTitle);
    };

    const closePopupHandler = () => {
        setArtworksToModerate([]);
        closePopup();
    };

    useEffect(() => {
        if (!artwork.is_moderated) {
            onReasonClick("All Good (by default)");
            setActiveReasonTitle(reasons[0].title);

            return;
        }
        if (artwork.is_active && artwork.is_public && artwork.is_moderated) {
            onReasonClick("All Good (by default)");
            setActiveReasonTitle(reasons[0].title);

            return;
        } else if (
            artwork.is_active &&
            !artwork.is_public &&
            artwork.is_moderated
        ) {
            onReasonClick("Not public");
            setActiveReasonTitle(reasons[1].title);

            return;
        }
    }, [artwork.id]);

    useEffect(() => {
        returnArtworkImageIds();
        setActiveArtworkImageId(returnArtworkImageIds()[0].imageId);

        if (artwork.is_active && artwork.is_public && artwork.is_moderated) {
            onReasonClick("All Good (by default)");
            setActiveReasonTitle(reasons[0].title);

            return;
        } else if (
            artwork.is_active &&
            !artwork.is_public &&
            artwork.is_moderated
        ) {
            onReasonClick("Not public");
            setActiveReasonTitle(reasons[1].title);

            return;
        }
    }, [artwork.id]);

    /* useEffect(() => {
        closePopup();
    }, [pathname]); */

    return (
        <>
            {openPopup === "moderateArtwork" && (
                <>
                    <div
                        className={styles.popupBg}
                        onClick={closePopupHandler}
                    ></div>
                    <div className={styles.popup}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                Primary Image Moderation ({currentArtworkIndex}{" "}
                                of {totalArtworks})
                            </div>
                            <button
                                className={styles.buttonClose}
                                onClick={closePopupHandler}
                            >
                                <Image
                                    src="/media/close.svg"
                                    alt="close"
                                    width="10"
                                    height="10"
                                />
                            </button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.left}>
                                <div className={styles.topContent}>
                                    <div className={styles.topLeft}>
                                        <div className={styles.title}>
                                            <div
                                                onClick={() => {
                                                    closePopup();
                                                    router.push(
                                                        `/artworks/${artwork.id}`,
                                                    );
                                                }}
                                            >
                                                <span
                                                    className={
                                                        styles.artworkTitle
                                                    }
                                                >
                                                    {sliceTitle(
                                                        artwork.title || "",
                                                        25,
                                                    )}
                                                </span>
                                            </div>
                                            <Image
                                                src="/media/info.svg"
                                                alt="info"
                                                width="14"
                                                height="14"
                                            />
                                        </div>
                                        <p className={styles.id}>
                                            Artwork ID: {artwork.id}
                                        </p>
                                        <Link
                                            className={styles.author}
                                            href={`/users/${artwork.owner.id}`}
                                        >
                                            <Image
                                                src={returnAuthorImage(
                                                    artwork.author.avatar_id,
                                                )}
                                                alt="author"
                                                width="32"
                                                height="32"
                                                style={{
                                                    background: "#393945",
                                                }}
                                            />
                                            <div>
                                                {artwork.author.first_name ||
                                                    "" +
                                                        artwork.author
                                                            .last_name}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className={styles.topRight}>
                                        <div className={styles.images}>
                                            {artwork.artwork_images.map(
                                                (image, index) => (
                                                    <img
                                                        key={index}
                                                        src={imageService.getUrl(
                                                            ImageTargetEnum.Artwork,
                                                            {
                                                                artworkId:
                                                                    artwork.id,
                                                            },
                                                            image.image_id,
                                                            "small",
                                                        )}
                                                        alt="art"
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <Link href="#">All artworks</Link>
                                    </div>
                                </div>
                                <div className={styles.slider}>
                                    <div className={styles.mainPhoto}>
                                        {activeArtworkImageId !== "" && (
                                            <img
                                                src={imageService.getUrl(
                                                    ImageTargetEnum.Artwork,
                                                    {
                                                        artworkId: artwork.id,
                                                    },
                                                    activeArtworkImageId,
                                                    "full",
                                                )}
                                                alt="art"
                                            />
                                        )}
                                    </div>
                                    <div className={styles.bottomSlider}>
                                        <div
                                            className={styles.prev}
                                            onClick={goToPrevArtworkImage}
                                        >
                                            <ArrowLeft
                                                isActive={
                                                    returnArtworkImageIds().findIndex(
                                                        (image) =>
                                                            image.imageId ===
                                                            activeArtworkImageId,
                                                    ) !== 0
                                                }
                                            />
                                            <div
                                                className={
                                                    returnArtworkImageIds().findIndex(
                                                        (image) =>
                                                            image.imageId ===
                                                            activeArtworkImageId,
                                                    ) !== 0
                                                        ? styles.active
                                                        : styles.inactive
                                                }
                                            >
                                                Previous
                                            </div>
                                        </div>
                                        <div className={styles.images}>
                                            {artwork.artwork_images.map(
                                                (image, index) => (
                                                    <img
                                                        src={imageService.getUrl(
                                                            ImageTargetEnum.Artwork,
                                                            {
                                                                artworkId:
                                                                    artwork.id,
                                                            },
                                                            image.image_id,
                                                            "small",
                                                        )}
                                                        key={index}
                                                        className={
                                                            image.image_id ===
                                                            activeArtworkImageId
                                                                ? styles.active
                                                                : ""
                                                        }
                                                        alt=""
                                                        onClick={() =>
                                                            setActiveArtworkImageId(
                                                                image.image_id,
                                                            )
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <div
                                            className={styles.next}
                                            onClick={goToNextArtworkImage}
                                        >
                                            <div
                                                className={
                                                    returnArtworkImageIds().findIndex(
                                                        (image) =>
                                                            image.imageId ===
                                                            activeArtworkImageId,
                                                    ) !==
                                                    returnArtworkImageIds()
                                                        .length -
                                                        1
                                                        ? styles.active
                                                        : styles.inactive
                                                }
                                            >
                                                Next
                                            </div>
                                            <ArrowRight
                                                isActive={
                                                    returnArtworkImageIds().findIndex(
                                                        (image) =>
                                                            image.imageId ===
                                                            activeArtworkImageId,
                                                    ) !==
                                                    returnArtworkImageIds()
                                                        .length -
                                                        1
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.descriptionTitle}>
                                    Description
                                </div>
                                <div className={styles.description}>
                                    {artwork.description}
                                </div>
                            </div>
                            <div className={styles.right}>
                                <div className={styles.title}>
                                    Moderation reason
                                </div>
                                {reasons.map((reason, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.allGood} ${
                                            activeReasonTitle === reason.title
                                                ? styles.activeReason
                                                : ""
                                        }`}
                                        onClick={() => {
                                            onReasonClickHandler(reason.title);
                                        }}
                                    >
                                        {activeReasonTitle === reason.title ? (
                                            <Image
                                                src="/media/all-good-active.svg"
                                                alt="radio button icon"
                                                width="24"
                                                height="24"
                                            />
                                        ) : (
                                            <Image
                                                src="/media/all-good-inactive.svg"
                                                alt="radio button icon"
                                                width="24"
                                                height="24"
                                                onClick={() =>
                                                    setActiveReasonTitle(
                                                        reason.title,
                                                    )
                                                }
                                                style={{ cursor: "pointer" }}
                                            />
                                        )}
                                        <div>
                                            <div
                                                className={styles.allGoodTitle}
                                            >
                                                {reason.title}
                                            </div>
                                            <p
                                                className={
                                                    styles.allGoodDescription
                                                }
                                            >
                                                {reason.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {/* <div className={styles.orContainer}>
                                    <hr />
                                    <span>or</span>
                                    <hr />
                                </div> */}
                                {/* <div className={styles.reasons}>
                                    <div className={styles.item}>
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'
                                        >
                                            <path
                                                d='M19 8C20.6569 8 22 6.65685 22 5C22 3.34315 20.6569 2 19 2C17.3431 2 16 3.34315 16 5C16 6.65685 17.3431 8 19 8Z'
                                                fill='#A1A5B7'
                                            />
                                            <g opacity='0.3'>
                                                <path
                                                    d='M19 9.5C17.8073 9.49736 16.6643 9.0224 15.8209 8.17906C14.9776 7.33572 14.5026 6.19266 14.5 5C14.51 4.30367 14.6812 3.61912 15 3H7C5.67392 3 4.40215 3.52678 3.46447 4.46447C2.52678 5.40215 2 6.67392 2 8V17C2 18.3261 2.52678 19.5979 3.46447 20.5355C4.40215 21.4732 5.67392 22 7 22H16C17.3261 22 18.5979 21.4732 19.5355 20.5355C20.4732 19.5979 21 18.3261 21 17V9C20.3809 9.31884 19.6963 9.48998 19 9.5Z'
                                                    fill='#A1A5B7'
                                                />
                                            </g>
                                        </svg>
                                        <div className={styles.reasonTitle}>
                                            Poor image quality
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className={styles.notes}>
                                    <div className={styles.notesTitle}>
                                        Notes
                                    </div>
                                    <div className={styles.content}>
                                        <Input
                                            placeholder='Add comment ...'
                                            className={styles.input}
                                        />
                                        <div className={styles.filters}>
                                            <div>New first</div>
                                            <svg
                                                width='18'
                                                height='18'
                                                viewBox='0 0 18 18'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <path
                                                    d='M5.78655 4.17708C6.14159 4.17708 6.42941 4.48704 6.42941 4.86939V11.6246L7.90341 10.1511C8.13515 9.91935 8.4998 9.90152 8.75199 10.0976L8.81255 10.1511C9.0636 10.4021 9.0636 10.8092 8.81255 11.0602L6.24112 13.6317C5.99007 13.8827 5.58303 13.8827 5.33198 13.6317L2.76055 11.0602C2.5095 10.8092 2.5095 10.4021 2.76055 10.1511C3.01161 9.90003 3.41864 9.90003 3.66969 10.1511L5.14369 11.6246V4.86939C5.14369 4.51253 5.39441 4.21873 5.71651 4.18114L5.78655 4.17708ZM12.6697 4.33966L15.2411 6.91108C15.4922 7.16214 15.4922 7.56917 15.2411 7.82022C14.9901 8.07127 14.583 8.07127 14.332 7.82022L12.858 6.34608V13.1514C12.858 13.5064 12.5702 13.7942 12.2151 13.7942C11.8601 13.7942 11.5723 13.5064 11.5723 13.1514V6.34608L10.0983 7.82022C9.84721 8.07127 9.44018 8.07127 9.18913 7.82022C8.93808 7.56917 8.93808 7.16214 9.18913 6.91108L11.7606 4.33966C12.0116 4.0886 12.4186 4.0886 12.6697 4.33966Z'
                                                    fill='#8993A4'
                                                />
                                            </svg>
                                        </div>
                                        <div className={styles.note}>
                                            <div className={styles.noteAuthor}>
                                                <img
                                                    src=''
                                                    alt='note`s author'
                                                />
                                                <div>
                                                    'artwork.note.author.title'
                                                </div>
                                            </div>
                                            <div className={styles.text}>
                                                'artwork.note.title'
                                            </div>
                                            <div className={styles.date}>
                                                'artwork.note.date'
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>
                                {/* test error message */}
                            </div>
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={skip}>
                                    Skip
                                </Button>
                                <Button appearance="blue" onClick={confirm}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
    setArtworksToModerate: (artworksToModerate: number[]) => ({
        type: "SET_ARTWORKS_TO_MODERATE",
        artworksToModerate,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ModerateArtworkPopup = connector(ModerateArtworkPopupComponent);
