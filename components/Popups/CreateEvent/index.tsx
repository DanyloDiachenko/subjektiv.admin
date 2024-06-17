"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { EditEventPopupProps } from "./popup.props";
import {
    ArtworkAdminItemDto,
    MainEventPostRequestDto,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import DatePicker from "react-datepicker";
import { ArtworkIdsSelect } from "./ArtworkIdsSelect";

const CreateEventPopupComponent = ({
    closePopup,
}: EditEventPopupProps): JSX.Element => {
    const router = useRouter();

    const [fields, setFields] = useState<MainEventPostRequestDto>({
        title: "",
        location: undefined,
        date_from: undefined,
        date_to: undefined,
        url: null,
        artwork_ids: undefined,
    });

    const onArtworkClick = (artwork: ArtworkAdminItemDto) => {
        if (fields.artwork_ids && fields?.artwork_ids.includes(artwork.id)) {
            setFields({
                ...fields,
                artwork_ids: fields?.artwork_ids.filter(
                    (id) => id !== artwork.id,
                ),
            });
        } else {
            setFields({
                ...fields,
                artwork_ids: fields?.artwork_ids
                    ? [...fields?.artwork_ids, artwork.id]
                    : [artwork.id],
            });
        }
    };

    const discard = () => {
        closePopup();
    };

    const submit = () => {
        if (!fields || !event) {
            return;
        }

        try {
            apiClient.main.event.eventControllerCreateEvent({
                requestBody: fields,
            });

            router.refresh();
            closePopup();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(fields);

    return (
        <>
            <div className={styles.popupBg}></div>
            <div className={styles.popup}>
                <div className={styles.header}>
                    <div className={styles.title}>Create Event</div>
                    <button className={styles.buttonClose} onClick={closePopup}>
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
                        <ArtworkIdsSelect
                            artworkIds={
                                fields.artwork_ids === undefined
                                    ? []
                                    : fields.artwork_ids
                            }
                            onArtworkClick={onArtworkClick}
                        />
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

export const CreateEventPopup = connector(CreateEventPopupComponent);
