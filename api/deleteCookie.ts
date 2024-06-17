"use server";

import { cookies } from "next/headers";

export const deleteCookie = async () => {
    "use server";

    cookies().delete("token");
};
