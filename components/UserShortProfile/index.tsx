import Image from "next/image";

import styles from "./styles.module.scss";
import { UserShortProfileProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { returnUserRole } from "@/helpers/returnUserRole";
import { renderVerificationStatus } from "@/helpers/renderVerificationStatus";

export const UserShortProfile = ({
    user,
}: UserShortProfileProps): JSX.Element => {
    if (!user) return <></>;

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

    return (
        <div className={`card mb-5 mb-xl-8 ${styles.card}`}>
            <div className="card-body">
                <div className="d-flex flex-column pt-5">
                    <div className="symbol symbol-100px symbol-circle mb-7 d-flex flex-center">
                        <Image
                            src={returnImagesPhoto(user.avatar_id)}
                            alt="user photo"
                            width={100}
                            height={100}
                            style={{
                                background: "#393945",
                                borderRadius: "50%",
                            }}
                        />
                    </div>
                    <div className="fs-3 text-gray-800 fw-bold mb-3 text-center">
                        {user.first_name} {user.last_name}
                    </div>
                    <div
                        className={`${styles.roleAndStatusBlock} mb-9 d-flex flex-center`}
                    >
                        <div className={` ${styles.role}`}>
                            {returnUserRole(user)}
                        </div>
                        {(user.is_artist || user.is_expert) && (
                            <div className={styles.verified}>
                                {renderVerificationStatus(
                                    user.verification_status,
                                )}
                            </div>
                        )}
                    </div>
                    <div className={styles.characteristics}>
                        <div className={styles.item}>
                            <div className={styles.value}>
                                {user.followers_number}
                            </div>
                            <div className={styles.description}>Followers</div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.value}>
                                {user.followings_number}
                            </div>
                            <div className={styles.description}>Following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
