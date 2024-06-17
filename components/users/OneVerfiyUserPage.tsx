import { Navbar } from "@/components/Navbar";
import { UserActionPanel } from "@/components/UserActionPanel";
import { UserShortProfile } from "@/components/UserShortProfile";
import { ITab } from "@/components/Navbar/tab.interface";
import { MainAdminUserGetIdResponseDto } from "@/submodules/common-dto/api-client/main";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PayoutInformation } from "../UserPayoutInfo";

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
        title: "Verfiy Users",
        url: "/verify-users",
    },
    {
        title: "Verfiy User",
        url: "#",
    },
];

const OneVerifyUserPage = ({ oneUser }: IOneUser): JSX.Element => {
    const tabs: ITab[] = [
        {
            title: "Document Verification",
            link: "document-verification",
        },
        {
            title: "Payout Information",
            link: "payout-information",
        },
    ];

    if (!oneUser) return <h1 style={{ marginLeft: 30 }}>Loading...</h1>;

    return (
        <>
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
                                            <PayoutInformation
                                                user={oneUser}
                                                contentType="verifyUser"
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

export default OneVerifyUserPage;
