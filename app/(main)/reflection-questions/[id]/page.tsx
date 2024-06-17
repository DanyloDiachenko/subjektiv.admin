import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ReflectionQuestionDetails } from "@/components/ReflectionQuestionDetails";

interface CountryPageProps {
    params: {
        id: number;
    };
}

async function getReflectionQuestion(id: number) {
    try {
        return await apiClient.main.commentQuestion.artworkCommentQuestionControllerGetCommentQuestion(
            {
                id,
            },
        );
    } catch (error) {
        console.log("error-getting-country", error);
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
        title: "Reflection question Details",
        url: "#",
    },
];

const ReflectionQuestion = async ({ params: { id } }: CountryPageProps) => {
    apiClientServerInit();
    const reflectionQuestion = await getReflectionQuestion(id);

    if (!reflectionQuestion) {
        return <></>;
    }

    return (
        <>
            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View Event Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <ReflectionQuestionDetails
                                reflectionQuestion={reflectionQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReflectionQuestion;
