import React from "react";

import { apiClientServerInit } from "@/api/getTokenOnServer";
import ChatMessaging from "@/components/messages/ChatMessaging";

const Page = async () => {
    apiClientServerInit();

    return (
        <section>
            <ChatMessaging />
        </section>
    );
};

export default Page;
