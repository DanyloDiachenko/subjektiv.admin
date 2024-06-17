"use client";

import { ProfileDetails } from "@/components/UserProfileDetails";
import { Navbar } from "@/components/Navbar";
import { UserActionPanel } from "@/components/UserActionPanel";
import { UserCollection } from "@/components/UserCollection";
import { UserShortProfile } from "@/components/UserShortProfile";
import { UserStudio } from "@/components/UserStudio";
import { ITab } from "@/components/Navbar/tab.interface";
import { EditUserPopup } from "@/components/Popups/EditUser";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { UserLoginSession } from "@/components/UserLoginSession";
import { UserShippingAdress } from "@/components/UserShippingAddress";
import { PayoutInformation } from "../UserPayoutInfo";
import { UserLab } from "../UserLab";
import { UserOrderHistory } from "../UserOrderHistory";

interface IOneUser {
    oneUser: MainAdminUserGetIdResponseDto;
}

const routes = [
    {
        title: "Home",
        url: "#",
    },
    {
        title: "User Management",
        url: "/users",
    },
    {
        title: "All Users",
        url: "/users",
    },
    {
        title: "User Details",
        url: "#",
    },
];

const OneUserPage = ({ oneUser }: IOneUser): JSX.Element => {
    const tabs: ITab[] = [
        {
            title: "Personal Info",
            link: "personal-info",
        },
        {
            title: "Studio",
            link: "studio",
        },
        {
            title: "Lab",
            link: "lab",
        },
        {
            title: "Collection",
            link: "collection",
        },
        {
            title: "Login Sessions",
            link: "loginSessions",
        },
        {
            title: "Shipping Address",
            link: "shippingAddress",
        },
        {
            title: "Payout Information",
            link: "payout-information",
        },
    ];

    if (!oneUser) return <h1 style={{ marginLeft: 30 }}>Loading...</h1>;

    return (
        <>
            <EditUserPopup user={oneUser} />

            <div className="app-main flex-column flex-row-fluid">
                <div className="d-flex flex-column flex-column-fluid">
                    <div className="app-toolbar py-3 py-lg-6">
                        <div className="app-container  d-flex flex-stack">
                            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                                <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                                    View User Details
                                </h1>
                                <Breadcrumbs routes={routes} />
                            </div>
                        </div>
                    </div>
                    <div className="app-content flex-column-fluid">
                        <div className="app-container ">
                            <div className="d-flex flex-column flex-lg-row">
                                <div className="flex-column flex-lg-row-auto w-lg-250px w-xl-350px mb-10">
                                    <UserShortProfile user={oneUser} />
                                    <UserActionPanel user={oneUser} />
                                </div>
                                <div className="flex-lg-row-fluid ms-lg-15">
                                    <Navbar tabs={tabs} />
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane active"
                                            role="tabpanel"
                                        >
                                            <ProfileDetails user={oneUser} />
                                            <UserStudio authorId={oneUser.id} />
                                            <UserLab
                                                username={oneUser.username}
                                            />
                                            <UserCollection
                                                username={oneUser.username}
                                            />
                                            <UserLoginSession
                                                userEmail={oneUser.email}
                                            />
                                            <UserOrderHistory
                                                username={oneUser.username}
                                            />
                                            <UserShippingAdress
                                                username={oneUser.username}
                                            />
                                            <PayoutInformation
                                                user={oneUser}
                                                contentType="oneUser"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OneUserPage;
