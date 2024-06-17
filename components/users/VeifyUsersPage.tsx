"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { UsersTable } from "@/components/Tables/Users";
import { ISelectVariant } from "@/components/UI/Select/variant.interface";
import {
    AdminUserItemDto,
    AdminUserSortingFields,
    MainAdminUserGetResponseDto,
    SortOrder,
    UserVerificationStatus,
} from "@/submodules/common-dto/api-client/main";
import apiClient from "@/api/apiClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TotalItems } from "../UI/TotalItems";

interface IUsersPage {
    allUsers: MainAdminUserGetResponseDto;
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
        title: "Verify Users",
        url: "/verify-users",
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

const VerfiyUsersPage = ({ allUsers }: IUsersPage): JSX.Element => {
    const [usersQuantityPerPage, setUserQuantityPerPage] =
        useState<ISelectVariant>(usersQuantityPerPageVariants[0]);
    const [currentPage, setCurrentPage] = useState<number>(
        allUsers.current_page,
    );
    const [totalPages, setTotalPages] = useState<number>(allUsers.total_pages);
    const [total, setTotal] = useState<number>(allUsers.total);
    const [users, setUsers] = useState<AdminUserItemDto[]>(allUsers.items);
    const [searchUser, setSearchUser] = useState<string>("");

    const getUsersList = async (
        sortField?: AdminUserSortingFields,
        sortOrder?: SortOrder,
        updatedPage?: number,
    ) => {
        const searchQuery = searchUser.length >= 3 ? searchUser : undefined;

        try {
            const response =
                await apiClient.main.adminUser.adminUserControllerGetList({
                    page: updatedPage ? updatedPage : currentPage,
                    search: searchQuery,
                    verificationStatuses: [UserVerificationStatus.IN_PROGRESS],
                    sortField: sortField,
                    sortOrder: sortOrder,
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

    useEffect(() => {
        getUsersList();
    }, [currentPage]);

    useEffect(() => {
        getUsersList(undefined, undefined, 1);
    }, [searchUser]);

    return (
        <div className="d-flex flex-column flex-column-fluid">
            <div className="app-toolbar py-3 py-lg-6">
                <div className="app-container d-flex flex-stack">
                    <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                        <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                            Verfiy Users
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

export default VerfiyUsersPage;
