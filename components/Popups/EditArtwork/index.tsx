"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connect } from "react-redux";

import styles from "./styles.module.scss";
import { Input } from "@/components/UI/Input";
import { Button } from "@/components/UI/Button";

import { EditUserPopupProps } from "./popup.props";

import {
    CategoryItemDto,
    MainAdminArtworkGetIdResponseDto,
    MaterialDto,
    StyleDto,
    SubjectDto,
} from "@/submodules/common-dto/api-client/main";

import apiClient from "@/api/apiClient";

import { IPopupStore } from "@/store/popup/initStore";
import { IArtworkStore } from "@/store/artwork/initStore";
import { SelectOptionType } from "@/components/UI/SelectOption/select.props";
import { SelectOption } from "@/components/UI/SelectOption";

import { MultiValue } from "react-select";
import SelectorMulti, { ISelectOption } from "@/components/UI/SelectorMulti";

const EditArtworkPopupComponent = ({
    openPopup,
    closePopup,
}: EditUserPopupProps): JSX.Element => {
    const [artwork, setArtwork] = useState<MainAdminArtworkGetIdResponseDto>();
    const [changedFields, setChangedFields] = useState<{
        [key: string]: string | number | number[];
    }>({});
    const [materials, setMaterials] = useState<MaterialDto[]>();
    const [selectedMaterials, setSelectedMaterials] =
        useState<MultiValue<ISelectOption>>();
    const [categories, setCategories] = useState<CategoryItemDto[]>();
    const [stylesArtwork, setStylesArtwork] = useState<StyleDto[]>();
    const [_, setSubject] = useState<SubjectDto[]>();
    const router = useRouter();
    const params = useParams();

    const onChangeValue = (field: string, value: string | number) => {
        let currentChangedFields;
        if (field === "material_ids") {
            currentChangedFields = {
                ...changedFields,
                [field]: [Number(value)],
            };
        } else {
            currentChangedFields = {
                ...changedFields,
                [field]: value,
            };
        }

        setChangedFields(currentChangedFields);
    };

    const [errorMessage, setErrorMessage] = useState<string>("");

    const setPriceHandler = (inputValue: string) => {
        const numericValue = inputValue.replace(/,/g, ".");
        const cleanedValue = numericValue.replace(/[^\d.]/g, "");

        onChangeValue("price", cleanedValue);
    };

    console.log(changedFields);

    const discard = () => {
        closePopup();
    };

    const submit = async () => {
        const materialsId = selectedMaterials?.map((material) =>
            Number(material.id),
        );
        if (!changedFields) {
            return;
        }

        try {
            const response =
                await apiClient.main.artwork.artworkControllerUpdateArtwork({
                    id: artwork!.id,
                    requestBody: {
                        ...changedFields,
                        price: Math.floor(
                            (changedFields.price as number) * 100,
                        ),
                        material_ids: materialsId,
                    },
                });

            if (response.success) {
                closePopup();
                router.refresh();
            }
        } catch (error: any) {
            console.log("catch error patching artwork", error);
            const responseError = error.response;

            if (responseError.message) {
                setErrorMessage(
                    responseError.message.charAt(0).toUpperCase() +
                        responseError.message.slice(1),
                );
            }
        }
    };

    const getMaterials = async () => {
        await apiClient.main.materials
            .materialControllerGetAll({
                page: -1,
            })
            .then((response) => {
                setMaterials(response.items);
            });
    };
    const getCategory = async () => {
        await apiClient.main.categories
            .categoryControllerGetAll({})
            .then((response) => {
                setCategories(response.items);
            });
    };
    const getStyle = async () => {
        await apiClient.main.styles
            .styleControllerGetAll({
                page: -1,
            })
            .then((response) => {
                setStylesArtwork(response.items);
            });
    };
    const getSubject = async () => {
        await apiClient.main.subjects
            .subjectControllerGetAll({
                page: -1,
            })
            .then((response) => {
                setSubject(response.items);
            });
    };
    useEffect(() => {
        getMaterials();
        getCategory();
        getStyle();
        getSubject();
    }, []);

    useEffect(() => {
        void apiClient.main.adminArtwork
            .adminArtworkControllerGetArtwork({
                id: Number(params.id),
            })
            .then((response: MainAdminArtworkGetIdResponseDto) => {
                setArtwork(response);
                setSelectedMaterials(
                    materialSelectorOption(response.materials),
                );
                setChangedFields({
                    price: response.price / 100 || 0,
                    weight: response.weight,
                });
            });
    }, []);

    const materialSelectorOption = (materials: MaterialDto[]) => {
        if (materials) {
            return materials.map((material) => ({
                value: material.slug,
                label: material.title,
                id: material.id,
            }));
        }
    };
    console.log(selectedMaterials);
    return (
        <>
            {openPopup === "editArtwork" && (
                <>
                    <div className={styles.popupBg} onClick={closePopup}></div>
                    <div className={styles.popup}>
                        <div className={styles.header}>
                            <div className={styles.title}>Edit Artwork</div>
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
                            <label
                                htmlFor="artworkName"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Artwork Name
                                </div>
                                <Input
                                    className={`${styles.input} ${
                                        changedFields.title === ""
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="Artwork Name"
                                    defaultValue={
                                        artwork
                                            ? (artwork?.title as string)
                                            : (changedFields?.title as string)
                                    }
                                    onChange={(e) => {
                                        onChangeValue("title", e.target.value);
                                    }}
                                />
                            </label>
                            {/* <label
                                htmlFor='is artrtworkFinished'
                                className={`${styles.label} ${styles.labelArtrtworkFinished}`}
                            >
                                <div className={styles.inputTitle}>
                                    Artwork Finished
                                </div>
                                <Switch />
                            </label> */}
                            {/* <label htmlFor='authorId' className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Author ID
                                </div>
                                <Input
                                    className={`${styles.input} ${styles.inputDisabled}`}
                                    placeholder='Author ID'
                                    value='`Author ID`'
                                    disabled
                                />
                            </label>
                            <label htmlFor='authorId' className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Owner ID
                                </div>
                                <Input
                                    className={`${styles.input} ${styles.inputDisabled}`}
                                    placeholder='Owner ID'
                                    value='`Owner ID`'
                                    disabled
                                />
                            </label> */}
                            {/* <label
                                data-tooltip-content="Currently doesn`t work"
                                data-tooltip-id="tooltip-status"
                                htmlFor="status"
                                className={styles.label}
                            >
                                <Tooltip id="tooltip-status" />
                                <div className={styles.inputTitle}>Status</div>
                                <SelectOption
                                    placeholder="Choose category"
                                    variants={category!}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue("category", variant?.id)
                                    }
                                    activeValue={artwork?.category?.title}
                                />
                                <ArtworkStatusSelect />
                            </label> */}
                            <label
                                data-tooltip-content="Currently doesn`t work"
                                data-tooltip-id="tooltip-category"
                                htmlFor="category"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Category
                                </div>

                                <SelectOption
                                    placeholder="Choose category"
                                    variants={categories!}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue(
                                            "category_id",
                                            variant?.id!,
                                        )
                                    }
                                    activeValue={artwork?.category?.title}
                                />
                            </label>
                            <label htmlFor="materials" className={styles.label}>
                                <div className={styles.inputTitle}>
                                    Materials
                                </div>

                                <SelectorMulti
                                    options={materialSelectorOption(materials!)}
                                    value={selectedMaterials!}
                                    onChange={(option) =>
                                        setSelectedMaterials(option)
                                    }
                                />
                            </label>
                            <label htmlFor="style" className={styles.label}>
                                <div className={styles.inputTitle}>Style</div>

                                <SelectOption
                                    placeholder="Choose style"
                                    variants={stylesArtwork!}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue("style_id", variant?.id!)
                                    }
                                    activeValue={artwork?.style?.title}
                                />
                            </label>
                            <label htmlFor="materials" className={styles.label}>
                                <div className={styles.inputTitle}>Subject</div>

                                <SelectOption
                                    placeholder="Choose subject"
                                    variants={stylesArtwork!}
                                    setVariant={(variant: SelectOptionType) =>
                                        onChangeValue("style_id", variant?.id!)
                                    }
                                    activeValue={artwork?.style?.title}
                                />
                            </label>
                            <div className={styles.sizes}>
                                <label
                                    htmlFor="height"
                                    className={styles.label}
                                >
                                    <div className={styles.inputTitle}>
                                        Height
                                    </div>
                                    <Input
                                        className={`${styles.input} ${
                                            changedFields.height
                                                ? styles.empty
                                                : ""
                                        }`}
                                        placeholder="Height"
                                        defaultValue={
                                            artwork?.height
                                                ? (artwork?.height as number)
                                                : (changedFields!
                                                      .height as number)
                                        }
                                        type="number"
                                        onChange={(e) => {
                                            onChangeValue(
                                                "height",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                                <label htmlFor="width" className={styles.label}>
                                    <div className={styles.inputTitle}>
                                        Width
                                    </div>
                                    <Input
                                        className={`${styles.input} ${
                                            changedFields.width
                                                ? styles.empty
                                                : ""
                                        }`}
                                        placeholder="Width"
                                        defaultValue={
                                            artwork?.width
                                                ? (artwork?.width as number)
                                                : (changedFields?.width as number)
                                        }
                                        type="number"
                                        onChange={(e) => {
                                            onChangeValue(
                                                "width",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                                <label
                                    htmlFor="Depthy"
                                    className={styles.label}
                                >
                                    <div className={styles.inputTitle}>
                                        Depthy
                                    </div>
                                    <Input
                                        className={`${styles.input} ${
                                            changedFields.depth
                                                ? styles.empty
                                                : ""
                                        }`}
                                        placeholder="Depthy"
                                        defaultValue={
                                            artwork
                                                ? (artwork?.depth as number)
                                                : (changedFields?.depth as number)
                                        }
                                        type="number"
                                        onChange={(e) => {
                                            onChangeValue(
                                                "depth",
                                                Number(e.target.value),
                                            );
                                        }}
                                    />
                                </label>
                            </div>
                            <label
                                htmlFor="weight"
                                className={styles.label}
                                style={{ position: "relative" }}
                            >
                                <div className={styles.inputTitle}>
                                    Weight, KG
                                </div>

                                <Input
                                    className={`${styles.input}`}
                                    placeholder="0"
                                    value={
                                        changedFields?.weight
                                            ? String(changedFields.weight)
                                            : ""
                                    }
                                    onChange={(e) =>
                                        onChangeValue(
                                            "weight",
                                            Number(e.target.value),
                                        )
                                    }
                                    type="number"
                                />
                            </label>
                            <label
                                htmlFor="price"
                                className={styles.label}
                                style={{ position: "relative" }}
                            >
                                <div className={styles.inputTitle}>Price</div>
                                <span className={styles.dolarIcon}>$</span>
                                <Input
                                    className={`${styles.input} ${styles.inputPrice}`}
                                    placeholder="0"
                                    value={
                                        changedFields?.price
                                            ? String(changedFields.price)
                                            : ""
                                    }
                                    onChange={(e) =>
                                        setPriceHandler(e.target.value)
                                    }
                                />
                            </label>
                            <label
                                htmlFor="description"
                                className={styles.label}
                            >
                                <div className={styles.inputTitle}>
                                    Description
                                </div>
                                <textarea
                                    className={`${styles.textarea} ${
                                        changedFields.description
                                            ? styles.empty
                                            : ""
                                    }`}
                                    placeholder="Description"
                                    defaultValue={
                                        artwork
                                            ? (artwork?.description as string)
                                            : (changedFields?.description as string)
                                    }
                                    onChange={(e) => {
                                        onChangeValue(
                                            "description",
                                            e.target.value,
                                        );
                                    }}
                                />
                            </label>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.error}>{errorMessage}</div>
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
            )}
        </>
    );
};

const mapState = (state: {
    openPopup: IPopupStore;
    artwork: IArtworkStore;
}) => ({
    openPopup: state.openPopup.openPopup,
    artwork: state.artwork.artwork,
});
const mapDispatch = {
    closePopup: () => ({ type: "CLOSE_POPUP" }),
};

const connector = connect(mapState, mapDispatch);

export const EditArtworkPopup = connector(EditArtworkPopupComponent);
