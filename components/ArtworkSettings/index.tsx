"use client";
import allStyle from "./styles.module.scss";
import React, { useState } from "react";
import { GeneralTables } from "../Tables/General";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { Breadcrumbs } from "../Breadcrumbs";
import { MainSubjectGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectGetResponseDto";
import { MainCategoriesGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainCategoriesGetResponseDto";
import { MainStyleGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainStyleGetResponseDto";
import { MainMaterialGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainMaterialGetResponseDto";
import { MainKeywordsGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainKeywordsGetResponseDto";

interface ArtworkSettingsProps {
    subjects: MainSubjectGetResponseDto;
    categories: MainCategoriesGetResponseDto;
    styles: MainStyleGetResponseDto;
    materials: MainMaterialGetResponseDto;
    keywords: MainKeywordsGetResponseDto;
}

const routes = [
    {
        title: "App Settings",
        url: "/app-settings/artwork",
    },
    {
        title: "Artwork",
        url: "/app-settings/artwork",
    },
];

const tabs = [
    { title: "Category", id: 1, slug: ImageTargetEnum.Category },
    { title: "Material", id: 2, slug: ImageTargetEnum.Material },
    { title: "Style", id: 3, slug: ImageTargetEnum.Style },
    { title: "Subject", id: 4, slug: ImageTargetEnum.Subject },
    { title: "Keywords", id: 5, slug: ImageTargetEnum.Keyword },
];

const ArtworkSettings = ({
    subjects,
    categories,
    styles,
    materials,
    keywords,
}: ArtworkSettingsProps) => {
    const [activeTab, setActiveTab] = useState(ImageTargetEnum.Category);

    console.log(activeTab);

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            Artwork settings
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>
            <div className={`app-container   ${allStyle.tabWrapper}`}>
                <div className="gap-7 d-flex">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            className={`${allStyle.tabTitle} ${
                                activeTab === tab.slug ? allStyle.active : ""
                            }`}
                            onClick={() => setActiveTab(tab.slug)}
                        >
                            {tab.title}
                        </div>
                    ))}
                </div>

                <div className={`app-container  ${allStyle.tabBorder} `}></div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container">
                    <div className="card">
                        {activeTab === ImageTargetEnum.Subject && (
                            <GeneralTables
                                page={ImageTargetEnum.Subject}
                                data={subjects}
                                section={activeTab}
                            />
                        )}
                        {activeTab === ImageTargetEnum.Category && (
                            <GeneralTables
                                data={categories}
                                page={ImageTargetEnum.Category}
                                section={activeTab}
                            />
                        )}
                        {activeTab === ImageTargetEnum.Keyword && (
                            <GeneralTables
                                data={keywords}
                                page={ImageTargetEnum.Keyword}
                                section={undefined}
                            />
                        )}
                        {activeTab === ImageTargetEnum.Style && (
                            <GeneralTables
                                data={styles}
                                page={ImageTargetEnum.Style}
                                section={activeTab}
                            />
                        )}
                        {activeTab === ImageTargetEnum.Material && (
                            <GeneralTables
                                data={materials}
                                page={ImageTargetEnum.Material}
                                section={activeTab}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtworkSettings;
