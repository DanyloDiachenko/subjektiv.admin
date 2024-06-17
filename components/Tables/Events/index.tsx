"use client";

import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import Pagination from "@/components/UI/Pagination";
import { EventsTableProps } from "./module.props";
import { EventItemDto } from "@/submodules/common-dto/api-client/main";
import { Button } from "@/components/UI/Button";
import Image from "next/image";
import Link from "next/link";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { sliceTitle } from "@/helpers/sliceTitle";
import apiClient from "@/api/apiClient";
import { formatDate } from "@/helpers/formatDate";
import { TotalItems } from "@/components/UI/TotalItems";

const EventsTableComponent = ({
    eventsResponse,
    setOpenPopup,
}: EventsTableProps) => {
    const [events, setEvents] = useState<EventItemDto[]>(eventsResponse.items);
    const [currentPage, setCurrentPage] = useState(eventsResponse.current_page);
    const [totalPages, setTotalPages] = useState(eventsResponse.total_pages);
    const [total, setTotal] = useState(eventsResponse.total);

    const returnImagesPhoto = (imageId: string | null) => {
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

    const getEvents = async () => {
        try {
            const events = await apiClient.main.event.eventControllerGetEvents({
                page: currentPage,
            });

            setEvents(events.items);
            setTotalPages(events.total_pages);
            setTotal(events.total);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getEvents();
    }, [currentPage]);

    console.log(events);

    return (
        <>
            <div className={`card-body py-4 ${styles.table}`}>
                <div className={styles.newEventWrapper}>
                    <TotalItems number={total} />
                    <Button
                        appearance="blue"
                        className={styles.newEventButton}
                        onClick={() => setOpenPopup("createEvent")}
                    >
                        <span className={styles.plus}>
                            <Image
                                src="/media/plus.svg"
                                alt="plus"
                                width="18"
                                height="18"
                            />
                        </span>
                        <span>New Event</span>
                    </Button>
                </div>
                <table
                    className={`table align-middle table-row-dashed fs-6 gy-5`}
                >
                    <thead>
                        <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                            <th className={styles.thEventId}>ID</th>
                            <th className={styles.thEventTitle}>TITLE</th>
                            <th className={styles.thEventLocation}>LOCATION</th>
                            <th className={styles.thAuthor}>AUTHOR</th>
                            <th className={styles.thArtworks}>ARTWORKS IDS</th>
                            <th>DATE FROM</th>
                            <th>DATE TO</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        href={"/events/" + event.id}
                                        className={styles.linkTitle}
                                    >
                                        {event.id}
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        href={"/events/" + event.id}
                                        className={styles.linkTitle}
                                    >
                                        {sliceTitle(event.title, 30)}
                                    </Link>
                                </td>
                                <td>{event.location}</td>
                                <td className={styles.authorTd}>
                                    <Link
                                        href={"/users/" + event.author.id}
                                        className={styles.linkTitle}
                                    >
                                        <img
                                            src={returnImagesPhoto(
                                                event.author.avatar_id,
                                            )}
                                            alt={
                                                event.author.first_name ||
                                                "" + event.author.last_name
                                            }
                                            style={{
                                                background: "#393945",
                                                borderRadius: "50%",
                                            }}
                                            width={40}
                                            height={40}
                                        />
                                        <div>
                                            <div>
                                                {sliceTitle(
                                                    event.author.first_name ||
                                                        "",
                                                    30,
                                                )}
                                            </div>
                                            <div className={styles.lastName}>
                                                {sliceTitle(
                                                    event.author.last_name ||
                                                        "",
                                                    30,
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td>
                                    {event.artworks.map((artwork) => (
                                        <Link
                                            href={"/artworks/" + artwork.id}
                                            className={styles.linkTitle}
                                        >
                                            {artwork.id + " "}
                                        </Link>
                                    ))}
                                </td>
                                <td>
                                    {event.date_from &&
                                        formatDate(event.date_from)}
                                </td>
                                <td>
                                    {event.date_to && formatDate(event.date_to)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.bottomContent}>
                <div></div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </>
    );
};

const mapState = () => ({});
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};
const connector = connect(mapState, mapDispatch);

export const EventsTable = connector(EventsTableComponent);
