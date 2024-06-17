import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostDetails } from "@/components/PostDetails";

interface PostPageProps {
    params: {
        id: number;
    };
}

async function getPost(id: number) {
    try {
        return await apiClient.main.artworkPost.artworkPostControllerGetArtworkPost(
            {
                id,
            },
        );
    } catch (error) {
        console.log("error-getting-post", error);
    }
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "Post Management",
        url: "/artwork-posts",
    },
    {
        title: "Post Details",
        url: "#",
    },
];

const Post = async ({ params: { id } }: PostPageProps) => {
    apiClientServerInit();
    const post = await getPost(id);
    console.log(post);

    if (!post) {
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
                                    View Post Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container">
                            <PostDetails post={post} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
