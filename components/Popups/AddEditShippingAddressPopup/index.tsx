"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";

import { EditUserPopupProps } from "./popup.props";
import useClickOutside from "@/helpers/useClickOutside";

import apiClient from "@/api/apiClient";
import { IRootState } from "@/store";

import { SelectOption } from "@/components/UI/SelectOption";
import { CountryDto } from "@/submodules/common-dto/api-client/main/models/CountryDto";
import { CityDto } from "@/submodules/common-dto/api-client/main/models/CityDto";
import { MainAddressPostRequestDto } from "@/submodules/common-dto/api-client/main/models/MainAddressPostRequestDto";
import { MainAddressPutIdRequestDto } from "@/submodules/common-dto/api-client/main/models/MainAddressPutIdRequestDto";
import { useParams, useRouter } from "next/navigation";

import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminUserGetIdResponseDto";
import { MainAddressGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAddressGetIdResponseDto";
import { SelectOptionType } from "@/components/UI/SelectOption/select.props";
import { Checkbox } from "@/components/UI/Checkbox";
import PhoneNumberInput from "@/components/UI/PhoneInput";
import { UserCountrySelect } from "./UserCountrySelect";

export const AddEditShippingAddressPopupComponent = ({
    openPopup,
    closePopup,
    addressId,
}: EditUserPopupProps): JSX.Element => {
    const router = useRouter();
    const params = useParams();
    const [cities, setCities] = useState<CityDto[]>([]);
    const [user, setUser] = useState<MainAdminUserGetIdResponseDto>();
    const [countryCode, setCountyrCode] = useState("");

    const [changedFields, setChangedFields] = useState<
        | {
              [key: string]: string | number;
          }
        | MainAddressGetIdResponseDto
    >({});
    const [errorMessages, setErrorMessages] = useState<{
        [key: string]: string | null;
    }>({});
    const [isSubmit, setIsSubmit] = useState(false);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [isPrimary, setIsPrimary] = useState(false);
    useClickOutside(popupRef, () => {
        closePopup();
    });

    const onChangeValue = (field: string, value: string | number) => {
        const currentChangedFields = {
            ...changedFields,
            [field]: value,
        };

        setChangedFields(currentChangedFields);
        if (openPopup === "addShippingAddress") {
            setIsSubmit(
                Object.values(currentChangedFields).every((value) => {
                    if (typeof value === "string") {
                        return value.trim() !== "";
                    } else {
                        return value !== null && value !== undefined;
                    }
                }) && Object.keys(changedFields).length === 6,
            );
        } else {
            setIsSubmit(true);
        }
    };
    function transformText(text: string) {
        if (text) {
            const transformedText = text
                .replace(/(_|id)/g, "")
                .replace(/^\w/, (char) => char.toUpperCase());
            return transformedText;
        } else {
            return null;
        }
    }

    const addEditShipping = async () => {
        if (openPopup === "addShippingAddress") {
            await apiClient.main.address
                .addressControllerCreateAddress({
                    requestBody: {
                        username: user?.username,
                        ...changedFields,
                    } as MainAddressPostRequestDto,
                })
                .then(() => {
                    closePopup();
                    router.refresh();
                })
                .catch((error) => {
                    console.log(error);
                    const errorMessages = error.response.data;
                    const erroMessagesObject = {
                        country_id: transformText(errorMessages.country_id),
                        city: transformText(errorMessages.city),
                        street: transformText(errorMessages.street),
                        zipcode: transformText(errorMessages.zipcode),
                        fullname: transformText(errorMessages.fullname),
                        phone: transformText(errorMessages.phone),
                    };
                    setErrorMessages(erroMessagesObject);
                    console.log(erroMessagesObject);
                });
        } else {
            const newRequestBody = {
                country_id: (changedFields.country as CountryDto).id,
                city: changedFields.city,
                street: changedFields.street,
                zipcode: changedFields.zipcode,
                fullname: changedFields.fullname,
                phone: changedFields.phone,
            };
            await apiClient.main.address
                .addressControllerUpdateAddress({
                    id: addressId,
                    requestBody: newRequestBody as MainAddressPutIdRequestDto,
                })
                .then(() => {
                    closePopup();
                    router.refresh();
                });
        }
    };

    useEffect(() => {
        apiClient.main.cities
            .cityControllerGetAll({ page: 1 })
            .then((response) => {
                setCities(response.items);
            });
        apiClient.main.adminUser
            .adminUserControllerGetById({ id: params.id })
            .then((response) => {
                setUser(response);
            });
    }, []);
    useEffect(() => {
        if (openPopup === "editShippingAddress") {
            apiClient.main.address
                .addressControllerGetAddressById({ id: addressId })
                .then((response) => {
                    setChangedFields(response);
                    setCountyrCode(response.country.short_code!);
                });
        } else {
            setChangedFields({});
        }
    }, [openPopup]);

    return (
        <>
            {(openPopup === "addShippingAddress" ||
                openPopup === "editShippingAddress") && (
                <>
                    <div className={styles.popupBg}></div>
                    <div className={styles.popup} ref={popupRef}>
                        <div className={styles.header}>
                            <div className={styles.title}>
                                {openPopup === "addShippingAddress"
                                    ? "Add Shipping Address"
                                    : " Edit Shipping Address"}
                            </div>
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
                            <label htmlFor="fullName" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Full name{" "}
                                </div>
                                <Input
                                    className={`${styles.input}
                                     ${
                                         changedFields.fullname === "" ||
                                         errorMessages.fullname
                                             ? styles.empty
                                             : ""
                                     }
                                    `}
                                    defaultValue={changedFields.fullname}
                                    placeholder="Type Full name"
                                    onChange={(e) =>
                                        onChangeValue(
                                            "fullname",
                                            e.target.value,
                                        )
                                    }
                                    errorMessage={errorMessages.fullname}
                                />
                            </label>
                            <label htmlFor="country" className={styles.label}>
                                <div className={styles.inputTitle}>Country</div>
                                {/* <SelectOption
                                    placeholder="Choose country"
                                    variants={countries}
                                    setVariant={(variant: SelectOptionType) => {
                                        onChangeValue(
                                            "country_id",
                                            variant?.id!
                                        );
                                        if (
                                            variant &&
                                            "short_code" in variant
                                        ) {
                                            setCountyrCode(
                                                variant.short_code as keyof CountryDto
                                            );
                                        }
                                    }}
                                    activeValue={
                                        changedFields?.country
                                            ? (
                                                  changedFields?.country as CountryDto
                                              ).title
                                            : ""
                                    }
                                    errorMessage={errorMessages.country_id}
                                /> */}
                                <UserCountrySelect
                                    onCountryClick={(country) => {
                                        onChangeValue("country_id", country.id);
                                        if ("short_code" in country) {
                                            setCountyrCode(
                                                country.short_code as keyof CountryDto,
                                            );
                                        }
                                    }}
                                />
                            </label>
                            <label htmlFor="Phone" className={styles.label}>
                                <div className={styles.inputTitle}>Phone</div>
                                <PhoneNumberInput
                                    className={`${styles.input}
                                    ${
                                        changedFields.phone === "" ||
                                        errorMessages.phone
                                            ? styles.empty
                                            : ""
                                    }
                                    `}
                                    value={changedFields.phone}
                                    onChangeValue={onChangeValue}
                                    country={countryCode}
                                    placeholder="Type Phone number"
                                    errorMessage={errorMessages.phone}
                                />
                            </label>
                            <label htmlFor="city" className={styles.label}>
                                <div className={styles.inputTitle}>City</div>
                                <SelectOption
                                    placeholder="Choose city"
                                    variants={cities}
                                    setVariant={(city: SelectOptionType) =>
                                        onChangeValue("city", city?.title!)
                                    }
                                    activeValue={changedFields?.city as string}
                                    errorMessage={errorMessages.city}
                                />
                            </label>{" "}
                            <label htmlFor="post-code" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Post code
                                </div>
                                <Input
                                    className={`${styles.input}    ${
                                        changedFields.zipcode === "" ||
                                        errorMessages.zipcode
                                            ? styles.empty
                                            : ""
                                    }`}
                                    value={changedFields.zipcode}
                                    // defaultValue={
                                    //     addressData
                                    //         ? addressData.zipcode
                                    //         : changedFields.zipcode
                                    // }
                                    placeholder="Type post code"
                                    onChange={(e) =>
                                        onChangeValue("zipcode", e.target.value)
                                    }
                                    errorMessage={errorMessages.zipcode}
                                />
                            </label>
                            <label
                                htmlFor="address-line"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Address line
                                </div>
                                <Input
                                    className={`${styles.input}  ${
                                        changedFields.street === "" ||
                                        errorMessages.street
                                            ? styles.empty
                                            : ""
                                    }`}
                                    value={changedFields.street}
                                    // defaultValue={
                                    //     addressData
                                    //         ? addressData.street
                                    //         : changedFields.street
                                    // }
                                    placeholder="Type Address line"
                                    onChange={(e) =>
                                        onChangeValue("street", e.target.value)
                                    }
                                    errorMessage={errorMessages.street}
                                />
                            </label>
                            <label
                                htmlFor="primary-checkbox"
                                className={`${styles.label}`}
                            >
                                <Checkbox
                                    isChecked={isPrimary}
                                    label="Set as a Primary"
                                    onClick={() => setIsPrimary(!isPrimary)}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            {/* <div className={styles.error}>{errorMessage}</div> */}
                            <div className={styles.buttons}>
                                <Button appearance="grey" onClick={closePopup}>
                                    Discard
                                </Button>
                                <Button
                                    appearance={isSubmit ? "blue" : "grey"}
                                    onClick={addEditShipping}
                                    disabled={!isSubmit}
                                >
                                    {openPopup === "editShippingAddress"
                                        ? "Edit Address"
                                        : "Add Address"}
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
    addressId: state.openPopup.addressId,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const AddEditShippingAddressPopup = connector(
    AddEditShippingAddressPopupComponent,
);
