import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import OneUserPage from "@/components/users/OneUserPage";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminUserGetIdResponseDto";
import { notFound } from "next/dist/client/components/navigation";

type IProps = {
    params: {
        id: string;
    };
};

async function getOneUser(id: string): Promise<MainAdminUserGetIdResponseDto> {
    try {
        return await apiClient.main.adminUser.adminUserControllerGetById({
            id: id,
        });
    } catch (error) {
        console.log("error", error);
        return notFound();
    }
}
const UserOptions = async ({
    params: { id },
}: IProps): Promise<JSX.Element> => {
    apiClientServerInit();
    const oneUser = await getOneUser(id);

    return <OneUserPage oneUser={oneUser} />;
};

export default UserOptions;
