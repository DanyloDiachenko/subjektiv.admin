import Image from "next/image";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { SelectActions } from "@/components/UI/SelectActions";
import { ArtworkMediaDetailsTableProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { returnArtworkMediaTitle } from "@/helpers/returnArtworkMediaTitle";
import { ArtworkImageDto } from "@/submodules/common-dto/api-client/main";
import { formatEnumValue } from "@/helpers/formatEnumValue";

const ArtworkMediaDetailsTableComponent = ({
    artwork,
    setOpenPopup,
    setImagePopup,
}: ArtworkMediaDetailsTableProps): JSX.Element => {
    const getImageUrl = (image: ArtworkImageDto) => {
        return imageService.getUrl(
            ImageTargetEnum.Artwork,
            { artworkId: image.artwork_id },
            image.image_id ? image.image_id : "",
            "small",
        );
    };

    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className={styles.image}>IMAGE</th>
                        <th className={styles.type}>TYPE</th>
                        <th className={styles.dimesion}>DIMESION</th>
                        <th className={styles.size}>SIZE</th>
                        <th className={styles.modified}>LAST MODIFIED</th>
                        <th className={styles.actions}>ACTIONS</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {artwork.artwork_images.map((image, index) => (
                        <tr key={index}>
                            <td className={styles.imageTd}>
                                <div>
                                    <Image
                                        src={getImageUrl(image)}
                                        alt="artwork"
                                        width={32}
                                        height={32}
                                        onClick={() => {
                                            setOpenPopup("imagePopup");
                                            setImagePopup(getImageUrl(image));
                                        }}
                                    />
                                    <span>
                                        {returnArtworkMediaTitle(image.side)}
                                    </span>
                                </div>
                            </td>
                            <td>{image.format.toLocaleUpperCase()}</td>
                            <td>{formatEnumValue(image.ratio)}</td>
                            <td>'Size MB'</td>
                            <td>'Creted at'</td>
                            <td className={styles.actionsTd}>
                                <SelectActions placeholder="Actions" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    setImagePopup: (imageSrc: string) => ({
        type: "SET_IMAGE_POPUP",
        imageSrc,
    }),
};

const connector = connect(mapState, mapDispatch);

export const ArtworkMediaDetailsTable = connector(
    ArtworkMediaDetailsTableComponent,
);
