"use client";

import Link from "next/link";
import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { EventDetailsProps } from "./module.props";
import { formatDateShort } from "@/helpers/formatDate";
import apiClient from "@/api/apiClient";
import { useRouter } from "next/navigation";

const EventDetailsComponent = ({ event, setOpenPopup }: EventDetailsProps) => {
    const router = useRouter();

    const deleteEvent = () => {
        try {
            apiClient.main.event.eventControllerDeleteEvent({
                id: event.id,
            });

            router.push("/events");
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
                        onClick={() => setOpenPopup("editEvent")}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>ID</div>
                    <div className={styles.value}>{event.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Title</div>
                    <div className={styles.value}>{event.title}</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Location</div>
                    <div className={styles.value}>{event.location}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Date from</div>
                    <div className={styles.value}>
                        {event.date_from && (
                            <>{formatDateShort(event.date_from)}</>
                        )}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Date to</div>
                    <div className={styles.value}>
                        {event.date_to && <>{formatDateShort(event.date_to)}</>}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Url</div>
                    <div className={styles.value}>{event.url}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Author ID</div>
                    <div className={styles.value}>
                        <Link
                            href={"/users/" + event.author.id}
                            className={styles.linkTitle}
                        >
                            {event.author.id}
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Artworks IDS</div>
                    <div className={styles.value}>
                        {event.artworks.map((artwork, index) => (
                            <>
                                <Link
                                    href={"/artworks/" + artwork.id}
                                    className={styles.linkTitle}
                                >
                                    {artwork.id}
                                </Link>
                                {index < event.artworks.length - 1 && ", "}
                            </>
                        ))}
                    </div>
                </div>
                <div className={styles.item}>
                    <Button
                        className={styles.button}
                        appearance="red"
                        onClick={deleteEvent}
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
};

const connector = connect(mapState, mapDispatch);

export const EventDetails = connector(EventDetailsComponent);
