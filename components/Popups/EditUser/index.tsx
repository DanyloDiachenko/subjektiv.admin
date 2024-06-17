"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";
import { UserCountrySelect } from "./UserCountrySelect";
import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";
import {
    CountryDto,
    MainAdminUserGetIdResponseDto,
    MainAdminUserPatchUsernameRequestDto,
    UserVerificationStatus,
} from "@/submodules/common-dto/api-client/main";
import imageService from "@/api/imageService";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";
import { UserResidenceCountrySelect } from "./ResidenceCountrySelect";

export const EditUserPopupComponent = ({
    openPopup,
    closePopup,
}: // user,
EditUserPopupProps): JSX.Element => {
    const popupRef = useRef<HTMLDivElement | null>(null);
    const avatarInputRef = useRef<HTMLInputElement | null>(null);
    const params = useParams();

    const [user, setUser] = useState<MainAdminUserGetIdResponseDto>();

    useClickOutside(popupRef, () => {
        closePopup();
    });

    const returnVerfificationStatus = (verStatus: string) => {
        switch (verStatus) {
            case "notVerified":
                return UserVerificationStatus.NOT_VERIFIED;
            case "verified":
                return UserVerificationStatus.VERIFIED;
            case "inProgress":
                return UserVerificationStatus.IN_PROGRESS;
            case "verificationFailed":
                return UserVerificationStatus.VERIFICATION_FAILED;
        }
    };

    const transformUserToPatchState = (
        user: MainAdminUserGetIdResponseDto,
    ): MainAdminUserPatchUsernameRequestDto => {
        return {
            username: user?.username,
            first_name: user?.first_name || "",
            last_name: user?.last_name || "",
            avatar_id: user?.avatar_id || "",
            description: user?.description || undefined,
            country_id: user?.country?.id,
            social_link: user?.social_link,
            is_artist: user?.is_artist,
            is_expert: user?.is_expert,
            is_featured_artist: user?.is_featured_artist,
            verification_status: returnVerfificationStatus(
                user?.verification_status,
            ),
            country_residency_id: user?.residence_country?.id,
            vat_number: user?.vat_number || undefined,
            /* // @ts-expect-error
            phone: user?.phone || undefined, */
        };
    };

    const [fieldsToPatchUser, setFieldsToPatchUser] =
        useState<MainAdminUserPatchUsernameRequestDto | null>(
            transformUserToPatchState(user!),
        );
    const [emptyFieldsToPatchUser, setEmptyFieldsToPatchUser] = useState({
        userRole: false,
        email: false,
        username: false,
        first_name: false,
        last_name: false,
        location: false,
        social_link: false,
        phone: false,
    });
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [activeCountryTitle, setActiveCountryTitle] = useState<string>("");
    const [activeResidenceCountryTitle, setActiveResidenceCountryTitle] =
        useState<string>("");

    const setFieldsToPatchUserHandler = (
        field: string,
        value: string | number,
    ) => {
        setFieldsToPatchUser({
            ...fieldsToPatchUser,
            [field]: value,
        });

        setEmptyFieldsToPatchUser({
            ...emptyFieldsToPatchUser,
            [field]: value.toString().trim() === "",
        });
    };

    /* const setUserRoleHandler = (value: string) => {
        setEmptyFieldsToPatchUser({
            ...emptyFieldsToPatchUser,
            userRole: value.trim() === '',
        });

        setFieldsToPatchUser({
            ...fieldsToPatchUser,
            is_artist: value.toLocaleLowerCase() === 'artist',
            is_expert: value.toLocaleLowerCase() === 'expert',
            is_featured_artist: value.toLocaleLowerCase() === 'featured artist',
        });
    }; */

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleEditAvatarClick = () => {
        if (avatarInputRef.current) {
            avatarInputRef.current.click();
        }
    };

    const getUserImageSrc = (): string => {
        if (avatarFile) {
            return URL.createObjectURL(avatarFile);
        }

        if (fieldsToPatchUser?.avatar_id) {
            return imageService.getUrl(
                ImageTargetEnum.UserAvatar,
                null,
                fieldsToPatchUser.avatar_id || "",
                "small",
            );
        }

        if (!user?.avatar_id) {
            return "/media/no-avatar.png";
        }

        return "/media/no-avatar.png";
    };

    console.log(fieldsToPatchUser);

    const convertImageToBlob = (imageFile: File): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target?.result) {
                    const blob = new Blob([event.target.result], {
                        type: imageFile.type,
                    });
                    resolve(blob);
                } else {
                    reject(new Error("No result on file reader load event"));
                }
            };

            reader.onerror = (error: Event) => {
                reject(error);
            };

            reader.readAsArrayBuffer(imageFile);
        });
    };

    const hostUsersAvatar = async (): Promise<string | null> => {
        if (!avatarFile) {
            return null;
        }

        console.log(await convertImageToBlob(avatarFile));

        try {
            const blob = await convertImageToBlob(avatarFile);
            const createdImage = await imageService.upload(
                ImageTargetEnum.UserAvatar,
                blob,
                null,
            );

            return createdImage;
        } catch (error) {
            console.error("Ошибка при загрузке аватара:", error);
            return null;
        }
    };

    const submitPatchUser = async () => {
        const avatarId = await hostUsersAvatar();

        if (!fieldsToPatchUser || !user) {
            return;
        }

        if (avatarId) {
            fieldsToPatchUser.avatar_id = avatarId;
        }

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerUpdateUser({
                    username: user.username,
                    requestBody: {
                        ...fieldsToPatchUser,
                        description: fieldsToPatchUser.description?.length
                            ? fieldsToPatchUser.description
                            : "",
                    },
                });

            if (response.success && response.data.ok) {
                location.reload();
            } else {
                setErrorMessage("Error updating user");
            }
        } catch (error: any) {
            const responseError = error.response;
            console.error("Error updating user: ", responseError);

            let errorMessage = "Error";
            if (responseError && responseError.message) {
                errorMessage =
                    responseError.message.charAt(0).toUpperCase() +
                    responseError.message.slice(1);
            }
            setErrorMessage(errorMessage);
        }
    };

    const onCountryClick = (country: CountryDto) => {
        setFieldsToPatchUserHandler("country_id", country.id);
        setActiveCountryTitle(country.title);
    };
    const onResidenceCountryClick = (country: CountryDto) => {
        setFieldsToPatchUserHandler("country_residency_id", country.id);
        setActiveResidenceCountryTitle(country.title);
    };

    const getCountryById = async (countryId: number | undefined) => {
        if (countryId) {
            try {
                const response =
                    await apiClient.main.countries.countryControllerGetCountry({
                        id: countryId,
                    });
                if (response.title) {
                    setActiveCountryTitle(response.title);
                }
            } catch (error) {
                console.log("catch error getting country by id", error);
            }
        }
    };

    const getResidenceCountryById = async (countryId: number | undefined) => {
        if (countryId) {
            try {
                const response =
                    await apiClient.main.countries.countryControllerGetCountry({
                        id: countryId,
                    });
                if (response.title) {
                    setActiveResidenceCountryTitle(response.title);
                }
            } catch (error) {
                console.log("catch error getting country by id", error);
            }
        }
    };

    const discard = () => {
        closePopup();
        setFieldsToPatchUser(transformUserToPatchState(user!));
    };

    if (!fieldsToPatchUser) {
        return <></>;
    }

    useEffect(() => {
        apiClient.main.adminUser
            .adminUserControllerGetById({ id: params.id })
            .then((response) => {
                setUser(response);
                setFieldsToPatchUser(transformUserToPatchState(response));

                getCountryById(response.country?.id);
                getResidenceCountryById(response.residence_country?.id);
            });
    }, []);

    return (
        <>
            {openPopup === "editUser" && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>Edit Profile</div>
                            <button
                                className={styles.buttonClose}
                                onClick={closePopup}
                            >
                                <Image
                                    src="/media/close.svg"
                                    alt="close"
                                    width="10"
                                    height="10"
                                />
                            </button>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.avatar}>
                                <div className={styles.inputTitle}>Avatar</div>
                                <div className={styles.image}>
                                    <Image
                                        src={getUserImageSrc()}
                                        alt="avatar"
                                        width="90"
                                        height="90"
                                        className={styles.userImage}
                                        id="avatar"
                                    />
                                    <label htmlFor="avatar">
                                        <input
                                            type="file"
                                            id="avatar"
                                            ref={avatarInputRef}
                                            className={styles.inputFile}
                                            style={{ display: "none" }}
                                            onChange={handleAvatarChange}
                                        />
                                        <button
                                            onClick={handleEditAvatarClick}
                                            className={`${styles.imageButton} ${styles.editButton}`}
                                        >
                                            <Image
                                                src="/media/edit-profile.svg"
                                                alt="edit user photo"
                                                width="16"
                                                height="16"
                                            />
                                        </button>
                                    </label>
                                    <button
                                        className={`${styles.imageButton} ${styles.clearButton}`}
                                        onClick={() => {
                                            setAvatarFile(null);
                                            setFieldsToPatchUserHandler(
                                                "avatar_id",
                                                "",
                                            );
                                        }}
                                    >
                                        <Image
                                            src="/media/close-image-profile.svg"
                                            alt="clear user photo"
                                            width="16"
                                            height="16"
                                        />
                                    </button>
                                </div>
                                <p className={styles.imageParagraph}>
                                    Allowed file types: png, jpg, jpeg.
                                </p>
                            </div>
                            {/* <label htmlFor='role' className={styles.label}>
                                <div className={styles.inputTitle}>Role</div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.userRole
                                            ? styles.empty
                                            : ''
                                    }`}
                                    defaultValue={returnUserRole(user as IUser)}
                                    onChange={(e) =>
                                        setUserRoleHandler(e.target.value)
                                    }
                                />
                            </label> */}
                            <label htmlFor="email" className={styles.label}>
                                <div className={styles.inputTitle}>Email</div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.email
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder={user?.email || "Email"}
                                    value=""
                                    disabled={true}
                                />
                            </label>
                            <label htmlFor="userName" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    User name
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.username
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="User name"
                                    value={fieldsToPatchUser.username}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "username",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label htmlFor="phone" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    User Phone
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.phone
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="User phone"
                                    value={fieldsToPatchUser.phone || ""}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "phone",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label htmlFor="firstName" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    First name
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.first_name
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="First name"
                                    defaultValue={fieldsToPatchUser.first_name}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "first_name",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label htmlFor="lastName" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Last name
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.last_name
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="Last name"
                                    defaultValue={fieldsToPatchUser.last_name}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "last_name",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label htmlFor="location" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Location
                                </div>
                                <UserCountrySelect
                                    onCountryClick={onCountryClick}
                                    activeCountryTitle={activeCountryTitle}
                                />
                            </label>
                            <label
                                htmlFor="websiteLink"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Social Link
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        emptyFieldsToPatchUser.social_link
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="Social Link (Optional)"
                                    value={fieldsToPatchUser.social_link || ""}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "social_link",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label htmlFor="vatNumber" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    VAT Number
                                </div>
                                <Input
                                    className={styles.input}
                                    placeholder="VAT Number"
                                    value={fieldsToPatchUser.vat_number || ""}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "vat_number",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                            <label
                                htmlFor="residenceCountry"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Residence Country
                                </div>
                                <UserResidenceCountrySelect
                                    onCountryClick={onResidenceCountryClick}
                                    activeCountryTitle={
                                        activeResidenceCountryTitle
                                    }
                                />
                            </label>
                            <label htmlFor="bio" className={styles.label}>
                                <div className={styles.inputTitle}>Bio</div>
                                <textarea
                                    className={styles.textarea}
                                    placeholder="Bio"
                                    value={fieldsToPatchUser.description}
                                    onChange={(e) =>
                                        setFieldsToPatchUserHandler(
                                            "description",
                                            e.target.value,
                                        )
                                    }
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>{errorMessage}</div>
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={discard}>
                                    Discard
                                </Button>
                                <Button
                                    appearance="blue"
                                    onClick={submitPatchUser}
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

const mapState = (state: IRootState) => ({
    openPopup: state.openPopup.openPopup,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditUserPopup = connector(EditUserPopupComponent);
