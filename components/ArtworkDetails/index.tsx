import { connect } from "react-redux";

import { Button } from "../UI/Button";
import styles from "./styles.module.scss";
import { ArtworkDetailsProps } from "./module.props";
import { formatEnumValue } from "@/helpers/formatEnumValue";

const ArtworksDetailsComponent = ({
    artwork,
    setOpenPopup,
}: ArtworkDetailsProps): JSX.Element => {
    return (
        <div
            className={`card card-flush mb-6 mb-xl-9 ${styles.card}`}
            id="artworkDetails"
        >
            <div className={`card-header ${styles.cardHeader}`}>
                <div className="card-title flex-column">
                    <h2>Artwork Details</h2>
                </div>

                <div className="card-toolbar">
                    <Button
                        appearance="blue"
                        className={`btn btn-light-primary ${styles.editButton}`}
                        onClick={() => setOpenPopup("editArtwork")}
                    >
                        Edit
                    </Button>
                </div>
            </div>

            <div className={`card-body ${styles.cardBody}`}>
                <div className={styles.item}>
                    <div className={styles.label}>Artwork Name</div>
                    <div className={styles.value}>{artwork.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Artwork Status</div>
                    <div className={styles.value}>
                        {formatEnumValue(artwork.status)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Artwork ID</div>
                    <div className={styles.value}>{artwork.id}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Moderation Status</div>
                    <div className={styles.value}>
                        {artwork.is_moderated ? "Moderated" : "Not moderated"}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Category</div>
                    <div className={styles.value}>
                        {artwork.category?.title}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Tags</div>
                    <div className={styles.value}></div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Materials</div>
                    <div className={styles.value}>
                        {artwork.materials.map((material, index) => (
                            <span key={index}>
                                {material.title}
                                {index !== artwork.materials.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Style</div>
                    <div className={styles.value}>{artwork.style?.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Subject</div>
                    <div className={styles.value}>{artwork.subject?.title}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Dimensions (WxHxD)</div>
                    <div className={styles.value}>
                        {artwork.width} x {artwork.height} x {artwork.depth}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Weight</div>
                    <div className={styles.value}>{artwork.weight} KGs</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Volumetric Weight</div>
                    <div className={styles.value}>
                        {artwork.volumetric_weight} KGs
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Year</div>
                    <div className={styles.value}>{artwork.year}</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Price</div>
                    <div className={styles.value}>
                        €{(artwork.price / 100).toFixed(2)}
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.label}>Description</div>
                    <div className={styles.value}>{artwork.description}</div>
                </div>
            </div>
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

export const ArtworksDetails = connector(ArtworksDetailsComponent);
