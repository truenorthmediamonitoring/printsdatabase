import AddCompanyModal from "@/app/ui/addcompanymodal"
import CompaniesTable from "@/app/ui/companiestable"
import TableSkeleton from "@/app/ui/skeletons"
import { Suspense } from "react"

import { getServerSession } from "next-auth";
import userAccess from "@/app/lib/getUserAccess";
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AuthorizedUser from "@/app/ui/authorizeduser";


export default async function Company() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);

    return (
        <>
            <div className="py-6 md:pt-24 px-4 md:px-10 h-screen rounded-lg bg-white shadow-sm overflow-scroll">
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
                                    <h1 className=" text-3xl text-black font-notosans font-bold">Companies</h1>
                                    <span className="label-text text-black">Add a <span className=" font-medium text-black">Company, View all Companies</span> or <span className="font-medium text-red-700">Delete a Company </span>here.</span>
                                </div>
                                <AddCompanyModal />
                            </div>
                        </div>
                        <Suspense fallback={<TableSkeleton />}>
                            <CompaniesTable />
                        </Suspense>
                    </>
                )}
            </div>
        </>
    )
}