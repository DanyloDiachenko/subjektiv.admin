import styles from "./styles.module.scss";
import Image from "next/image";
import { IOrderStore } from "@/store/order/initStore";
import { connect } from "react-redux";
import { UserPreviewDto } from "@/submodules/common-dto/api-client/main";
import { getUserImage } from "@/helpers/getUserImage";
import { truncateString } from "@/helpers/truncateString";
import Link from "next/link";

interface ISellerBuyerBlockProps {
    owner?: UserPreviewDto;
    buyer?: UserPreviewDto;
    expert?: UserPreviewDto;
    author?: UserPreviewDto;
}

const UsersArtistOwnerExpertBlock = ({
    owner,
    buyer,
    expert,
    author,
}: ISellerBuyerBlockProps) => {
    return (
        <div className={`${styles.wrapper} `}>
            {owner && (
                <div>
                    <div className={`${styles.title} `}>OWNER</div>
                    <div className={`${styles.wrapperInfo} `}>
                        <div>
                            <Image
                                src={owner ? getUserImage(owner.avatar_id) : ""}
                                alt=""
                                width={50}
                                height={50}
                                className={styles.userImage}
                                id="image"
                                style={{
                                    background: "#393945",
                                    borderRadius: "50%",
                                }}
                            />
                        </div>

                        <div>
                            <div className={styles.name}>
                                <Link
                                    href={"/users/" + owner?.id}
                                    className={styles.linkTitle}
                                >
                                    {truncateString(
                                        owner?.first_name +
                                            " " +
                                            owner?.last_name,
                                        17,
                                    )}
                                </Link>
                                <div
                                    className={`${styles.role} ${
                                        styles[owner?.profile_type as string]
                                    }`}
                                >
                                    {owner?.profile_type}
                                </div>
                            </div>
                            <div className={styles.mail}>{owner?.email}</div>
                            {/* <div className={styles.number}>{owner?.id}</div> */}
                        </div>
                    </div>
                </div>
            )}
            {buyer && (
                <div>
                    <div
                        className={`${styles.title} ${styles.SellerBuyerBlock}`}
                    >
                        BUYER
                    </div>
                    <div
                        className={`${styles.wrapperInfo} ${styles.SellerBuyerBlock}`}
                    >
                        <div>
                            <Image
                                src={buyer ? getUserImage(buyer.avatar_id) : ""}
                                alt=""
                                width={50}
                                height={50}
                                className={styles.userImage}
                                id="image"
                                style={{
                                    background: "#393945",
                                    borderRadius: "50%",
                                }}
                            />
                        </div>

                        <div>
                            <div className={styles.name}>
                                <Link
                                    href={"/users/" + buyer?.id}
                                    className={styles.linkTitle}
                                >
                                    {truncateString(
                                        buyer?.first_name +
                                            " " +
                                            buyer?.last_name,
                                        17,
                                    )}
                                </Link>{" "}
                                <div
                                    className={`${styles.role} ${
                                        styles[buyer?.profile_type as string]
                                    }`}
                                >
                                    {buyer?.profile_type}
                                </div>
                            </div>
                            <div className={styles.mail}>{buyer?.email}</div>
                            {/* <div className={styles.number}>{buyer?.id}</div> */}
                        </div>
                    </div>
                </div>
            )}
            {expert && (
                <>
                    <div className={styles.divider}></div>
                    <div>
                        <div
                            className={`${styles.title} ${styles.SellerBuyerBlock}`}
                        >
                            ROYALTIES
                        </div>
                        <div
                            className={`${styles.wrapperInfo} ${styles.SellerBuyerBlock}`}
                        >
                            <div>
                                <Image
                                    src={getUserImage(expert.avatar_id)}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className={styles.userImage}
                                    id="image"
                                    style={{
                                        background: "#393945",
                                        borderRadius: "50%",
                                    }}
                                />
                            </div>

                            <div>
                                <div className={styles.name}>
                                    <Link
                                        href={"/users/" + buyer?.id}
                                        className={styles.linkTitle}
                                    >
                                        {truncateString(
                                            expert.first_name +
                                                " " +
                                                expert.last_name,
                                            17,
                                        )}
                                    </Link>{" "}
                                    <div
                                        className={`${styles.role} ${
                                            styles[
                                                expert?.profile_type as string
                                            ]
                                        }`}
                                    >
                                        {expert?.profile_type}
                                    </div>
                                </div>
                                <div className={styles.mail}>
                                    {expert.email}
                                </div>
                                {/* <div className={styles.number}>{expert.id}</div> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
            {author && (
                <>
                    <div className={styles.divider}></div>
                    <div>
                        <div
                            className={`${styles.title} ${styles.SellerBuyerBlock}`}
                        >
                            AUTHOR
                        </div>
                        <div
                            className={`${styles.wrapperInfo} ${styles.SellerBuyerBlock}`}
                        >
                            <div>
                                <Image
                                    src={getUserImage(author.avatar_id)}
                                    alt=""
                                    width={50}
                                    height={50}
                                    className={styles.userImage}
                                    id="image"
                                    style={{
                                        background: "#393945",
                                        borderRadius: "50%",
                                    }}
                                />
                            </div>

                            <div>
                                <div className={styles.name}>
                                    <Link
                                        href={"/users/" + buyer?.id}
                                        className={styles.linkTitle}
                                    >
                                        {truncateString(
                                            author.first_name +
                                                " " +
                                                author.last_name,
                                            17,
                                        )}
                                    </Link>{" "}
                                    <div
                                        className={`${styles.role} ${
                                            styles[
                                                author.profile_type as string
                                            ]
                                        }`}
                                    >
                                        {author.profile_type}
                                    </div>
                                </div>
                                <div className={styles.mail}>
                                    {author.email}
                                </div>
                                {/* <div className={styles.number}>{expert.id}</div> */}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const mapState = (state: { order: IOrderStore }) => {
    return {
        order: state.order.order,
    };
};
const mapDispatch = {};
const connector = connect(mapState, mapDispatch);

export default connector(UsersArtistOwnerExpertBlock);
