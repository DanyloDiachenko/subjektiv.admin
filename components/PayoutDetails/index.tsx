"use client";

import Link from "next/link";

import styles from "./styles.module.scss";
import { PayoutDetailsProps } from "./module.props";
import { formatDate } from "@/helpers/formatDate";
import { StatusSelector } from "./StatusSelector";
import { getUserImage } from "@/helpers/getUserImage";
import { getArtworkImage } from "@/helpers/getArtworkImage";
import { sliceTitle } from "@/helpers/sliceTitle";

export const PayoutDetails = ({ payout }: PayoutDetailsProps) => {
    return (
        <div className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}>
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Details</h2>
                </div>
            </div>
            <div className={`card-body ${styles.cardBody}`}>
                <StatusSelector
                    payoutStatus={payout.status}
                    targetOperator={payout.target_operator}
                />
                <hr />
                <div className={styles.item}>
                    <div className={styles.label}>Order ID</div>
                    <div className={styles.value}>
                        <Link
                            className={styles.user}
                            href={`/orders/${payout.order_id}`}
                        >
                            <img
                                src="/media/arrow.png"
                                alt="arrow"
                                style={{
                                    borderRadius: 0,
                                    background: 0,
                                    width: 15,
                                    height: "auto",
                                }}
                            />
                            <span className={styles.linkTitle}>
                                {payout.order_id}
                            </span>
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Receiver User</div>
                    <div className={styles.value}>
                        <Link
                            className={styles.user}
                            href={`/users/${payout.receiver_user?.id}`}
                        >
                            <img
                                src={getUserImage(
                                    payout.receiver_user?.avatar_id || "",
                                )}
                                alt="receiver user"
                            />
                            <div className={styles.linkTitle}>
                                {sliceTitle(
                                    payout.receiver_user?.first_name || "",
                                    20,
                                )}{" "}
                                {sliceTitle(
                                    payout.receiver_user?.last_name || "",
                                    20,
                                )}
                                <div className={styles.username}>
                                    @
                                    {sliceTitle(
                                        payout.receiver_user?.username || "",
                                        20,
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Artwork</div>
                    {payout.artwork?.id && (
                        <div className={styles.value}>
                            <Link
                                className={styles.artwork}
                                href={`/artworks/${payout.artwork?.id}`}
                            >
                                <img
                                    src={getArtworkImage(
                                        payout.artwork?.id,
                                        payout.artwork?.main_image?.image_id,
                                    )}
                                    alt="artwork"
                                />
                                <div className={styles.linkTitle}>
                                    {sliceTitle(
                                        payout.artwork?.title || "",
                                        30,
                                    )}
                                </div>
                            </Link>
                        </div>
                    )}
                </div>
                <hr />
                <div className={styles.item}>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.email}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Profile type</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.profile_type}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Currency</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.currency}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>IBAN</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.iban}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>BIC / Swift</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.swift}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Payment first name</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.payment_first_name}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Payment last name</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.payment_last_name}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Payment Operator</div>
                    <div className={styles.value}>
                        {payout.receiver_user?.payment_operator}
                    </div>
                </div>
                <hr />
                <div className={styles.item}>
                    <div className={styles.label}>Description</div>
                    <div className={styles.value}>{payout.description}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Receiver</div>
                    <div className={styles.value}>{payout.receiver_type}</div>
                </div>

                <div className={styles.item}>
                    <div className={styles.label}>Operator</div>
                    <div className={styles.value}>{payout.target_operator}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Amount</div>
                    <div className={styles.value}>
                        €{(payout.target_amount / 100).toFixed(2)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Currency Code</div>
                    <div className={styles.value}>
                        {payout.target_currency_code}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Receiver External ID</div>
                    <div className={styles.value}>
                        {payout.receiver_external_id}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>External Payout ID</div>
                    <div className={styles.value}>
                        {payout.external_payout_id}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Last 4 Digits</div>
                    <div className={styles.value}>{payout.last4Digits}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Update Date</div>
                    <div className={styles.value}>
                        {payout.update_date && formatDate(payout.update_date)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Created At</div>
                    <div className={styles.value}>
                        {payout.created_at && formatDate(payout.created_at)}
                    </div>
                </div>
            </div>
        </div>
    );
};
