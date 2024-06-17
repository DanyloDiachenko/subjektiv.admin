import apiClient, { KEY_REFRESH_TOKEN, KEY_TOKEN } from "@/api/apiClient";
import getServerCookie from "@/api/getServerCookie";

export function getTokenOnServer(): string | undefined {
    return getServerCookie(KEY_TOKEN);
}

function getRefreshTokenOnServer(): string | undefined {
    return getServerCookie(KEY_REFRESH_TOKEN);
}

export function apiClientServerInit(): void {
    const token = getTokenOnServer();
    const refreshToken = getRefreshTokenOnServer();

    apiClient.setToken(token);
    apiClient.setRefreshToken(refreshToken);
}
