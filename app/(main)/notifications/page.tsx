import apiClient from "@/api/apiClient";
import { apiClientServerInit } from "@/api/getTokenOnServer";
import { NotificationsPage } from "@/components/Notifications";
import { MainAdminNotificationGetResponseDto } from "@/submodules/common-dto/api-client/main";

async function getNotifications(): Promise<MainAdminNotificationGetResponseDto> {
    try {
        return await apiClient.main.adminNotification.adminNotificationControllerGetList(
            {
                page: 1,
            },
        );
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

const Notifications = async (): Promise<JSX.Element> => {
    apiClientServerInit();

    const notificationsResponse = await getNotifications();

    return <NotificationsPage notificationsResponse={notificationsResponse} />;
};

export default Notifications;
