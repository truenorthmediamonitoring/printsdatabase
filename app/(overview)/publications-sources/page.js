import AddPublicationModal from "@/app/ui/addpublicationmodal";
import AddSourceModal from "@/app/ui/addsourcemodal";
import TableSkeleton from "@/app/ui/skeletons";
import { Suspense } from "react";
import PublicationsTable from "@/app/ui/publicationstable";
import SourcesTable from "@/app/ui/sourcestable";
import AddNewsSegmentModal from "@/app/ui/addnewssegmentmodal";
import NewsSegmentTable from "@/app/ui/newssegmenttable";

import { getServerSession } from "next-auth";
import userAccess from "@/app/lib/getUserAccess";
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AuthorizedUser from "@/app/ui/authorizeduser";
import AddOnlinePublicationModal from "@/app/ui/addpublicationonlinemodal";
import PublicationsOnlineTable from "@/app/ui/publicationsonlinetable";

export default async function IndustriesCategories() {
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
                            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                                <div>
                                    <h1 className=" text-3xl text-black font-notosans font-bold">Publications (Print or Online)</h1>
                                    <span className="label-text text-black">Add a <span className=" font-medium text-black">Publication, View all Publications</span> or <span className="font-medium text-red-700">Delete a Publication </span> here.</span>
                                </div>
                                <div className="flex flex-wrap justify-end items-start gap-2">
                                    <AddPublicationModal />
                                    <AddOnlinePublicationModal />
                                </div>
                            </div>
                        </div>

                        <div className=" flex justify-start items-start gap-8 flex-wrap">
                            <Suspense fallback={<TableSkeleton />}>
                                <PublicationsTable />
                                <PublicationsOnlineTable />
                            </Suspense>
                        </div>

                        <div className="flex flex-col md:flex-row gap-2 justify-between items-center my-10">
                            <div>
                                <h1 className=" text-2xl text-black font-notosans font-bold">Sources & News Segments</h1>
                                <span className="label-text text-black">Add, View all or Delete Sources or News Segments here.</span>
                            </div>
                            <div className="flex flex-wrap justify-end items-start gap-2">
                                <AddSourceModal />
                                <AddNewsSegmentModal />
                            </div>
                        </div>
                        {/* Table Here  */}
                        <div className=" flex justify-start items-start gap-8 flex-wrap">
                            <Suspense fallback={<TableSkeleton />}>
                                <SourcesTable />
                            </Suspense>
                            <Suspense fallback={<TableSkeleton />}>
                                <NewsSegmentTable />
                            </Suspense>
                        </div>

                    </>
                )}
            </div>
        </>
    )
}