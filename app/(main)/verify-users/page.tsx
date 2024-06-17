import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import VerfiyUsersPage from "@/components/users/VeifyUsersPage";
import { UserVerificationStatus } from "@/submodules/common-dto/api-client/main";
import { MainAdminUserGetResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminUserGetResponseDto";
import { notFound } from "next/dist/client/components/not-found";

async function getUsersList(): Promise<MainAdminUserGetResponseDto> {
    try {
        return await apiClient.main.adminUser.adminUserControllerGetList({
            page: 1,
            verificationStatuses: [UserVerificationStatus.IN_PROGRESS],
        });
    } catch (error) {
        console.log(error);
        return notFound();
    }
}

const Users = async (): Promise<JSX.Element> => {
    apiClientServerInit();
    const users = await getUsersList();
    return <VerfiyUsersPage allUsers={users} />;
};

export default Users;
