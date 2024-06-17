import { notFound } from "next/navigation";

import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { GeneralDetails } from "@/components/GeneralDetails";
import { MainCategoriesGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainCategoriesGetIdResponseDto";
import { MainKeywordsMainKeywordsGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainKeywordsMainKeywordsGetIdResponseDto";
import { MainMaterialGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainMaterialGetIdResponseDto";
import { MainStyleGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainStyleGetIdResponseDto";
import { MainSubjectGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainSubjectGetIdResponseDto";
import ImageTargetEnum from "@/submodules/common-dto/constants/imageTarget.enum";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface IProps {
    params: {
        id: number;
        slug: string;
    };
}

async function getOneCategory(
    id: number,
): Promise<MainCategoriesGetIdResponseDto> {
    try {
        return await apiClient.main.categories.categoryControllerGetCategory({
            idOrSlug: id,
        });
    } catch (error) {
        console.log("error-getNotifications", error);
        return notFound();
    }
}
async function getOneSubject(id: number): Promise<MainSubjectGetIdResponseDto> {
    try {
        return await apiClient.main.subjects.subjectControllerGetSubject({
            idOrSlug: id,
        });
    } catch (error) {
        console.log("error-getNotifications", error);
        return notFound();
    }
}
async function getOneKeyword(
    id: number,
): Promise<MainKeywordsMainKeywordsGetIdResponseDto> {
    try {
        return await apiClient.main.keywords.keywordControllerGetKeyword({
            id,
        });
    } catch (error) {
        console.log("error-getNotifications", error);
        return notFound();
    }
}
async function getOneMaterial(
    id: number,
): Promise<MainMaterialGetIdResponseDto> {
    try {
        return await apiClient.main.materials.materialControllerGetMaterial({
            idOrSlug: id,
        });
    } catch (error) {
        console.log("error-getNotifications", error);
        return notFound();
    }
}
async function getOneStyle(id: number): Promise<MainStyleGetIdResponseDto> {
    try {
        return await apiClient.main.styles.styleControllerGetStyle({
            idOrSlug: id,
        });
    } catch (error) {
        console.log("error-getNotifications", error);
        return notFound();
    }
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
    {
        title: "Details",
        url: "#",
    },
];

const OneCategory = async ({ params: { id, slug } }: IProps) => {
    apiClientServerInit();

    let data;

    if (slug === ImageTargetEnum.Category) {
        data = await getOneCategory(id);
    } else if (slug === ImageTargetEnum.Subject) {
        data = await getOneSubject(id);
    } else if (slug === ImageTargetEnum.Keyword) {
        data = await getOneKeyword(id);
    } else if (slug === ImageTargetEnum.Material) {
        data = await getOneMaterial(id);
    } else if (slug === ImageTargetEnum.Style) {
        data = await getOneStyle(id);
    }

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            {data && <GeneralDetails data={data} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneCategory;
