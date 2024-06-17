import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReflectionQuestionsTable } from "@/components/Tables/ReflectionQuestions";

async function getReflectionQuestions() {
    try {
        return await apiClient.main.commentQuestion.artworkCommentQuestionControllerGetAll(
            {
                page: 1,
            },
        );
    } catch (error) {
        console.log("error-getiing-countries", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Reflection questions Management",
        url: "/reflection-questions",
    },
    {
        title: "All Reflection questions",
        url: "/reflection-questions",
    },
];

const ReflectionQuestionsPage = async () => {
    apiClientServerInit();
    const reflectionQuestions = await getReflectionQuestions();

    if (!reflectionQuestions) {
        return <></>;
    }

    return (
        <>
            <div className="d-flex flex-column flex-column-fluid">
                <div className="app-toolbar py-3 py-lg-6">
                    <div className="app-container d-flex flex-stack">
                        <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                Reflection Questions
                            </h1>
                            <Breadcrumbs routes={routes} />
                        </div>
                    </div>
                </div>

                <div className="app-content flex-column-fluid">
                    <div className="app-container">
                        <div className="card">
                            <ReflectionQuestionsTable
                                reflectionQuestions={reflectionQuestions}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReflectionQuestionsPage;
