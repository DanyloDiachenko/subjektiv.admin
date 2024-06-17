"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { UserListSelectors } from "@/components/UserListSelectors";
import { UsersTable } from "@/components/Tables/Users";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    AdminUserItemDto,
    AdminUserSortingFields,
    CountryDto,
    MainAdminUserGetResponseDto,
    SortOrder,
    UserVerificationStatus,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TotalItems } from "../UI/TotalItems";

interface IUsersPage {
    allUsers: MainAdminUserGetResponseDto;
    pageType: "users" | "expertWantedUsers";
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
];

const usersQuantityPerPageVariants: ISelectVariant[] = [
    {
        title: "10",
        value: "10",
    },
    {
        title: "20",
        value: "20",
    },
    {
        title: "50",
        value: "50",
    },
    {
        title: "100",
        value: "100",
    },
];

const rolesVariants: ISelectVariant[] = [
    {
        title: "Artist",
        value: "artist",
    },
    {
        title: "Expert",
        value: "expert",
    },
    {
        title: "Follower",
        value: "follower",
    },
];

const accountStatusVariants: ISelectVariant[] = [
    {
        title: "Active",
        value: "active",
    },
    {
        title: "Blocked",
        value: "blocked",
    },
];

const isUserExpertWantedVariants: ISelectVariant[] = [
    {
        title: "Expert",
        value: "1",
    },
    {
        title: "Not Expert",
        value: "-1",
    },
];

const verificationStatuses: ISelectVariant[] = [
    {
        title: "Verified",
        value: UserVerificationStatus.VERIFIED,
    },
    {
        title: "Not Verified",
        value: UserVerificationStatus.NOT_VERIFIED,
    },
    {
        title: "In Progress",
        value: UserVerificationStatus.IN_PROGRESS,
    },
    {
        title: "VerificationFailed",
        value: UserVerificationStatus.VERIFICATION_FAILED,
    },
];

const UsersPage = ({ allUsers, pageType }: IUsersPage): JSX.Element => {
    const [usersQuantityPerPage, setUserQuantityPerPage] =
        useState<ISelectVariant>(usersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(
        allUsers.current_page,
    );
    const [totalPages, setTotalPages] = useState<number>(allUsers.total_pages);
    const [total, setTotal] = useState<number>(allUsers.total);
    const [users, setUsers] = useState<AdminUserItemDto[]>(allUsers.items);
    const [role, setRole] = useState<ISelectVariant | null>(null);
    const [accountStatus, setAccountStatus] = useState<ISelectVariant | null>(
        null,
    );
    const [location, setLocation] = useState<ISelectVariant | null>(null);
    const [locations, setLocations] = useState<CountryDto[]>([]);
    const [searchUser, setSearchUser] = useState<string>("");
    const [verificationStatus, setVerificationStatus] =
        useState<ISelectVariant | null>(null);
    const [isUserExpertWanted, setIsUserExpertWanted] =
        useState<ISelectVariant | null>(null);

    const getUsersList = async (
        sortField?: AdminUserSortingFields,
        sortOrder?: SortOrder,
        updatedPage?: number,
    ) => {
        const searchQuery = searchUser.length >= 3 ? searchUser : undefined;

        let isExpertUserWanted = undefined;
        if (pageType === "expertWantedUsers") {
            isExpertUserWanted = true;
        } else if (isUserExpertWanted === null) {
            isExpertUserWanted = undefined;
        } else if (isUserExpertWanted && isUserExpertWanted.value) {
            isExpertUserWanted =
                Number(isUserExpertWanted.value) === -1 ? false : true;
        }

        let isUserExpert = undefined;
        if (isUserExpertWanted === null) {
            isUserExpert = undefined;
        } else if (isUserExpertWanted.value) {
            isUserExpert =
                Number(isUserExpertWanted.value) === 1 ? true : false;
        }

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerGetList({
                    page: updatedPage ? updatedPage : currentPage,
                    /* isActive: returnIsUserActive(), */
                    search: searchQuery,
                    countryIds: location ? [Number(location.value)] : undefined,
                    verificationStatuses: verificationStatus
                        ? [verificationStatus.value as UserVerificationStatus]
                        : undefined,
                    isExpertWanted: isExpertUserWanted,
                    isExpert: isUserExpert,
                    sortField: sortField,
                    sortOrder: sortOrder,
                    ...returnUserRole(),
                });
            if (response.items) {
                setTotalPages(response.total_pages);
                setUsers(response.items);
                setTotal(response.total);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getCountries = async () => {
        const data = await apiClient.main.countries.countryControllerGetAll({
            page: -1,
        });
        setLocations(data.items);
    };

    /* const returnIsUserActive = () => {
        if (accountStatus === null) return undefined;

        if (accountStatus.value === "active") {
            return true;
        } else if (accountStatus.value === "blocked") {
            return false;
        }
    }; */

    const returnUserRole = () => {
        if (role === null) return undefined;

        if (role.value === "artist") {
            return {
                isArtist: true,
            };
        }
        if (role.value === "expert") {
            return {
                isExpert: true,
            };
        }
        if (role.value === "follower") {
            return {
                isArtist: false,
                isExpert: false,
            };
        }
    };

    useEffect(() => {
        Promise.all([getUsersList(), getCountries()]);
    }, [currentPage]);

    useEffect(() => {
        getUsersList(undefined, undefined, 1);
    }, [
        location,
        role,
        accountStatus,
        searchUser,
        verificationStatus,
        isUserExpertWanted,
    ]);

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            Users List
                        </h1>
                        <Breadcrumbs routes={routes} />
                    </div>
                </div>
            </div>

            <div className="app-content flex-column-fluid">
                <div className="app-container ">
                    <div className="card">
                        <div className="card-header border-0 pt-6">
                            <div className="card-title">
                                <div className="d-flex align-items-center position-relative my-1">
                                    <Image
                                        className="position-absolute ms-5"
                                        src="/media/search.svg"
                                        alt="search"
                                        width={14}
                                        height={18}
                                    />
                                    <input
                                        type="text"
                                        className="form-control form-control-solid w-250px ps-13"
                                        placeholder="Search"
                                        value={searchUser}
                                        onChange={(e) =>
                                            setSearchUser(e.target.value)
                                        }
                                    />
                                    <TotalItems number={total} />
                                </div>
                            </div>
                            <UserListSelectors
                                role={role}
                                roleVariants={rolesVariants}
                                setRole={setRole}
                                accountStatus={accountStatus}
                                accountStatusVariants={accountStatusVariants}
                                setAccountStatus={setAccountStatus}
                                location={location}
                                locationVariants={locations.map((location) => ({
                                    title: location.title,
                                    value: location.id.toString(),
                                }))}
                                setLocation={setLocation}
                                verificationStatus={verificationStatus}
                                verificationStatusVariants={
                                    verificationStatuses
                                }
                                setVerificationStatus={setVerificationStatus}
                                pageType={pageType}
                                isUserExpert={isUserExpertWanted}
                                setIsUserExpert={setIsUserExpertWanted}
                                isUserExpertVariants={
                                    isUserExpertWantedVariants
                                }
                            />
                        </div>
                        <UsersTable
                            users={users}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                            usersQuantityPerPage={usersQuantityPerPage}
                            usersQuantityPerPageVariants={
                                usersQuantityPerPageVariants
                            }
                            setUserQuantityPerPage={setUserQuantityPerPage}
                            onThClick={getUsersList}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UsersPage;
