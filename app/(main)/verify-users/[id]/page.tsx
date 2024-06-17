import { notFound } from "next/dist/client/components/navigation";

import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import OneVerifyUserPage from "@/components/users/OneVerfiyUserPage";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main/models/MainAdminUserGetIdResponseDto";

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
const OneVerifyUser = async ({
    params: { id },
}: IProps): Promise<JSX.Element> => {
    apiClientServerInit();
    const oneUser = await getOneUser(id);

    return (
        <>
            <OneVerifyUserPage oneUser={oneUser} />
        </>
    );
};

export default OneVerifyUser;
