"use client";

import { useState } from "react";
import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { ArtworkDetailsProps } from "./module.props";
import { PackagingType } from "@/submodules/common-dto/api-client/main";

const ArtworksShippingDetailsComponent = ({
    artwork,
    setOpenPopup,
}: ArtworkDetailsProps): JSX.Element => {
    const [isContentOpened, setIsContentOpened] = useState(true);

    return (
        <div
            className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}
            id="shippingDetails"
        >
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>
                        Shipping Details
                        <img
                            src="/media/arrow-top.svg"
                            alt="arrow"
                            className={!isContentOpened ? styles.arrowDown : ""}
                            onClick={() => setIsContentOpened(!isContentOpened)}
                        />
                    </h2>
                </div>
                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn btn-light-primary ${styles.editButton}`}
                        onClick={() => setOpenPopup("editArtworkAddress")}
                    >
                        Edit
                    </Button>
                </div>
            </div>
            {isContentOpened && (
                <div className={`card-body ${styles.cardBody}`}>
                    <div className={styles.item}>
                        <div className={styles.label}>Weight</div>
                        <div className={styles.value}>{artwork.weight} KGS</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Packaging</div>
                        <div className={styles.value}>
                            {artwork.is_packed_by_me
                                ? "Packed by me"
                                : "Packed by delivery provider"}
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Is Mounted</div>
                        <div className={styles.value}>
                            {artwork.is_mounted ? "Mounted" : "Unmounted"}
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.label}>Packaging Type</div>
                        <div className={styles.value}>
                            {Array.isArray(artwork.packaging_types)
                                ? artwork.packaging_types
                                      .map((type) => {
                                          switch (type) {
                                              case PackagingType.ROLLED_IN_TUBE:
                                                  return "Rolled in Tube";
                                              case PackagingType.REINFORCED_ENVELOPE:
                                                  return "Reinforced Envelope";
                                              case PackagingType.WOODEN_BOX:
                                                  return "Wooden Box";
                                              default:
                                                  return type;
                                          }
                                      })
                                      .join(", ")
                                : artwork.packaging_types}
                        </div>
                    </div>
                    <div className={`${styles.item} ${styles.itemAddresses}`}>
                        <div>
                            <div className={styles.label}>Ship From</div>
                            <div className={styles.value}>
                                <div className={styles.addressWrapper}>
                                    {artwork.address && (
                                        <>
                                            <div>
                                                {artwork.address.fullname}
                                            </div>
                                            <div>{artwork.address.phone}</div>
                                            <div>
                                                {artwork.address.country.title},{" "}
                                                {artwork.address.city}
                                            </div>
                                            <div>
                                                {artwork.address.street},{" "}
                                                {artwork.address.house_number},{" "}
                                                {artwork.address.zipcode}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const mapState = () => {
    return {};
};
const mapDispatch = {
    setOpenPopup: (popupToOpen: string) => ({
        type: "SET_OPEN_POPUP",
        popupToOpen,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworksShippingDetails = connector(
    ArtworksShippingDetailsComponent,
);
