import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import PostsPage from "@/components/Posts";
import { MainArtworkPostGetResponseDto } from "@/submodules/common-dto/api-client/main";

async function getPosts(): Promise<MainArtworkPostGetResponseDto> {
    try {
        return await apiClient.main.artworkPost.artworkPostControllerGetPosts({
            page: 1,
        });
    } catch (error) {
        console.log(error);

        return {
            total_pages: 1,
            items: [],
            current_page: 1,
            total: 1,
            size: 1,
        };
    }
}

const Posts = async (): Promise<JSX.Element> => {
    apiClientServerInit();

    const postsResponse = await getPosts();

    return <PostsPage postsResponse={postsResponse} />;
};

export default Posts;
