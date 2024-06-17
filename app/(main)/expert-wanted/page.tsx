import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import UsersPage from "@/components/users/UsersPage";
import { MainAdminUserGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminUserGetResponseDto";
import { notFound } from "next/dist/client/components/not-found";

async function getUsersList(): Promise<MainAdminUserGetResponseDto> {
    try {
        return await apiClient.main.adminUser.adminUserControllerGetList({
            page: 1,
            isExpertWanted: true,
        });
    } catch (error) {
        console.log(error);
        return notFound();
    }
}

const WantedUsers = async (): Promise<JSX.Element> => {
    apiClientServerInit();
    const users = await getUsersList();

    return <UsersPage allUsers={users} pageType="expertWantedUsers" />;
};

export default WantedUsers;
