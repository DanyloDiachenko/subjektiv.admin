import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PostsProps } from "./posts.props";
import { PostsTable } from "../Tables/Posts";

const PostsPage = ({ postsResponse }: PostsProps): JSX.Element => {
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
            title: "All Posts",
            url: "/artwork-posts",
        },
    ];

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container  d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            All Posts
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>
            <div className="app-content flex-column-fluid">
                <div className="app-container  ">
                    <div className="card">
                        <PostsTable postsResponse={postsResponse} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostsPage;
