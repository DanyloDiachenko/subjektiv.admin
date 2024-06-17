import { cookies } from "next/headers";

export default function getServerCookie(name: string): string | undefined {
    const nextCookies = cookies();
    const value = nextCookies.get(name);

    if (!value) {
        return undefined;
    }

    return value.value;
}
