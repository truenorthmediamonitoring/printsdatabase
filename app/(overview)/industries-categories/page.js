import AddCategoryModal from "@/app/ui/addcategorymodal";
import AddIndustryModal from "@/app/ui/addindustrymodal";
import CategoriesTable from "@/app/ui/categoriestable";
import IndustriesTable from "@/app/ui/industriestable";
import TableSkeleton from "@/app/ui/skeletons";
import { Suspense } from "react";

import { getServerSession } from "next-auth";
import userAccess from "@/app/lib/getUserAccess";
import UnauthorizedAccess from "@/app/ui/unauthorizedaccess";
import AuthorizedUser from "@/app/ui/authorizeduser";

import { getIndustries } from "@/app/lib/getIndustries";
import { getCategories } from "@/app/lib/getCategories";

export default async function IndustriesCategories() {
    const session = await getServerSession()
    const useraccess = await userAccess(session.user.email);

    const industries = await getIndustries();
    const categories = await getCategories();

    // Convert data to a plain object
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));

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
                                    <h1 className=" text-3xl text-black font-notosans font-bold">Industries & Catergories</h1>
                                    <span className="label-text text-black">Add an <span className=" font-medium text-black">Industry or Categories, View all Industries or Catergories,</span> or <span className="font-medium text-red-700">Delete an Industry or Category </span>here.</span>
                                </div>
                                <div className="flex flex-wrap justify-end items-start gap-2">
                                    <AddIndustryModal />
                                    <AddCategoryModal />
                                </div>
                            </div>
                        </div>
                        <div className=" flex justify-between items-start gap-8 flex-wrap">
                            <IndustriesTable
                                Industries={Industries}
                            />

                            <CategoriesTable
                                Categories={Categories}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}