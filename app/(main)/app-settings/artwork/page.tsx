import { notFound } from "next/navigation";

import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import ArtworkSettings from "@/components/ArtworkSettings";

const getData = async (category: string, controller: string) => {
    try {
        // @ts-expect-error ___
        return await apiClient.main[category][controller]({ page: 1 });
    } catch (error) {
        console.error(`error-getData-${category}`, error);
        throw error;
    }
};

const ArtworkSettingsPage = async () => {
    apiClientServerInit();

    try {
        const subjects = await getData("subjects", "subjectControllerGetAll");
        const categories = await getData(
            "categories",
            "categoryControllerGetAll",
        );
        const styles = await getData("styles", "styleControllerGetAll");
        const materials = await getData(
            "materials",
            "materialControllerGetAll",
        );
        const keywords = await getData("keywords", "keywordControllerGetAll");

        return (
            <div>
                <ArtworkSettings
                    subjects={subjects}
                    categories={categories}
                    styles={styles}
                    materials={materials}
                    keywords={keywords}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching data:", error);
        return notFound();
    }
};

export default ArtworkSettingsPage;
