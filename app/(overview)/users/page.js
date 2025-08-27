import AddUserModal from "@/app/ui/addusermodal";
import UsersTable from "@/app/ui/userstable";
import TableSkeleton from "@/app/ui/skeletons";
import { Suspense } from "react";
import { getServerSession } from "next-auth";
import userAccess from "@/app/lib/getUserAccess";
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AuthorizedUser from "@/app/ui/authorizeduser";


export default async function Users() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);
    // console.log(useraccess);

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                {useraccess !== "Admin" && (
                    <UnauthorizedAccess />
                )}
                {useraccess === "Admin" && (
                    <AuthorizedUser />
                )}
                {useraccess === "Admin" && (
                    <>
                        <div className="mb-10">
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                                <div>
                                    <h1 className=" text-3xl text-black font-notosans font-bold ">Users</h1>
                                    <span className="label-text text-black">Add a <span className=" font-medium text-black">User, View all Users</span> or <span className="font-medium text-red-700">Delete a User </span>here.</span>
                                </div>
                                <AddUserModal />
                            </div>
                        </div>
                        <Suspense fallback={<TableSkeleton />}>
                            <UsersTable />
                        </Suspense>
                    </>
                )}
            </div>
        </>)
}