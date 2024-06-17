"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditEventPopupProps } from "./popup.props";
import {
    ArtworkAdminItemDto,
    MainEventPutIdRequestDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import DatePicker from "react-datepicker";
import { ArtworkIdsSelect } from "./ArtworkIdsSelect";

const EditEventPopupComponent = ({
    closePopup,
}: EditEventPopupProps): JSX.Element => {
    const router = useRouter();
    const eventId = Number(useParams().id);

    const [fields, setFields] = useState<MainEventPutIdRequestDto | null>(null);

    const discard = () => {
        closePopup();
    };

    const onArtworkClick = (artwork: ArtworkAdminItemDto) => {
        if (fields?.artwork_ids === undefined) {
            return;
        }

        if (fields?.artwork_ids.includes(artwork.id)) {
            setFields({
                ...fields,
                artwork_ids: fields?.artwork_ids.filter(
                    (id) => id !== artwork.id,
                ),
            });
        } else {
            setFields({
                ...fields,
                artwork_ids: [...fields?.artwork_ids, artwork.id],
            });
        }
    };

    const submit = async () => {
        if (!fields || !event) {
            return;
        }

        try {
            await apiClient.main.event.eventControllerUpdateEvent({
                id: eventId,
                requestBody: fields,
            });

            closePopup();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    const getEvent = async () => {
        const event = await apiClient.main.event.eventControllerGetEvent({
            id: eventId,
        });

        setFields({
            title: event.title,
            location: event.location || undefined,
            date_from: event.date_from,
            date_to: event.date_to,
            url: event.url,
            artwork_ids: event.artworks.map((artwork) => artwork.id),
        });
    };

    useEffect(() => {
        getEvent();
    }, []);

    if (!fields) {
        return <></>;
    }

    console.log(fields);
    console.log(new Date(""));

    return (
        <>
            <div className={styles.popupBg} onClick={discard}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Edit Event</div>
                    <button className={styles.buttonClose} onClick={discard}>
                        <Image
                            src="/media/close.svg"
                            alt="close"
                            width="10"
                            height="10"
                        />
                    </button>
                </div>
                <div className={styles.body}>
                    <label htmlFor="title" className={styles.label}>
                        <div className={styles.inputTitle}>Title</div>
                        <Input
                            className={styles.input}
                            placeholder={"Title"}
                            value={fields.title}
                            onChange={(e) =>
                                setFields({ ...fields, title: e.target.value })
                            }
                        />
                    </label>
                    <label htmlFor="location" className={styles.label}>
                        <div className={styles.inputTitle}>Location</div>
                        <Input
                            className={styles.input}
                            placeholder={"Location"}
                            value={fields.location}
                            onChange={(e) =>
                                setFields({
                                    ...fields,
                                    location: e.target.value,
                                })
                            }
                        />
                    </label>
                    <label htmlFor="dateFrom" className={styles.label}>
                        <div className={styles.inputTitle}>Date From</div>
                        <DatePicker
                            selected={
                                fields.date_from
                                    ? new Date(fields.date_from)
                                    : undefined
                            }
                            onChange={(date) =>
                                setFields({
                                    ...fields,
                                    date_from: date
                                        ? new Date(date).toISOString()
                                        : undefined,
                                })
                            }
                            className={styles.datePicker}
                        />
                    </label>
                    <label htmlFor="dateTo" className={styles.label}>
                        <div className={styles.inputTitle}>Date To</div>
                        <DatePicker
                            selected={
                                fields.date_to
                                    ? new Date(fields.date_to)
                                    : undefined
                            }
                            onChange={(date) =>
                                setFields({
                                    ...fields,
                                    date_to: date
                                        ? new Date(date).toISOString()
                                        : undefined,
                                })
                            }
                            className={styles.datePicker}
                        />
                    </label>
                    <label htmlFor="url" className={styles.label}>
                        <div className={styles.inputTitle}>Url</div>
                        <Input
                            className={styles.input}
                            placeholder={"Url"}
                            value={fields.url || ""}
                            onChange={(e) =>
                                setFields({ ...fields, url: e.target.value })
                            }
                        />
                    </label>
                    <label htmlFor="artworkIds" className={styles.label}>
                        <div className={styles.inputTitle}>Artwork Ids</div>
                        <p className={styles.paragraph}>
                            Type 3 symbols to search artwork
                        </p>
                        {fields.artwork_ids !== undefined && (
                            <ArtworkIdsSelect
                                artworkIds={fields.artwork_ids}
                                onArtworkClick={onArtworkClick}
                            />
                        )}
                    </label>
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

const mapState = () => {};
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditEventPopup = connector(EditEventPopupComponent);
