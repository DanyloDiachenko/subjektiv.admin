"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./styles.module.scss";
import Link from "next/link";
import { formatDate } from "@/helpers/formatDate";
import { Button } from "@/components/UI/Button";
import { ReviewRequestsTableProps } from "./module.props";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import apiClient from "@/api/apiClient";
import { MainArtworkReviewRequestItemDto } from "@/submodules/common-dto/api-client/main";
import { useRouter } from "next/navigation";

export const ReviewRequests = ({
    reviewRequests,
}: ReviewRequestsTableProps) => {
    const router = useRouter();

    const [requests, setRequests] =
        useState<MainArtworkReviewRequestItemDto[]>(reviewRequests);
    const [acceptedRequest, setAcceptedRequest] = useState(false);

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

    const onButtonClick = async (
        requestId: number,
        response: "accept" | "reject",
    ) => {
        if (response === "accept") {
            setRequests(requests.filter((req) => req.id === requestId));

            setAcceptedRequest(true);
        } else {
            setRequests(requests.filter((req) => req.id !== requestId));
        }

        try {
            await apiClient.main.artworkReviewRequest.artworkReviewRequestControllerPutExpertResponse(
                {
                    response: response,
                    requestId: requestId,
                },
            );

            router.refresh();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.tableWrapper}>
            <table
                className={`table align-middle table-row-dashed fs-6 ${styles.table}`}
            >
                <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className={styles.thExpert}>EXPERT NAME</th>
                        <th className={styles.thDate}>REVIEW REQUEST</th>
                        <th className={styles.thAssign}>ASSIGN</th>
                        <th className={styles.thAction}>ACTION</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 fw-semibold">
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td className={styles.expertTd}>
                                <Link href={`/users/${request.expert.id}`}>
                                    <Image
                                        src={returnImagesPhoto(
                                            request.expert.avatar_id,
                                        )}
                                        alt={
                                            request.expert.first_name ||
                                            "" + request.expert.last_name
                                        }
                                        width={32}
                                        height={32}
                                    />
                                    <span>
                                        {request.expert.first_name}{" "}
                                        {request.expert.last_name}
                                    </span>
                                </Link>
                            </td>
                            <td className={styles.dateTd}>
                                {formatDate(request.created_at)}
                            </td>
                            {acceptedRequest ? (
                                <td>
                                    <div className={styles.approved}>
                                        Approved
                                    </div>
                                </td>
                            ) : (
                                <>
                                    <td className={styles.approveTd}>
                                        <Button
                                            appearance="grey"
                                            className={styles.button}
                                            onClick={() =>
                                                onButtonClick(
                                                    request.id,
                                                    "accept",
                                                )
                                            }
                                        >
                                            Approve
                                        </Button>
                                    </td>
                                    <td className={styles.deleteTd}>
                                        <Button
                                            appearance="red"
                                            className={styles.button}
                                            onClick={() =>
                                                onButtonClick(
                                                    request.id,
                                                    "reject",
                                                )
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
