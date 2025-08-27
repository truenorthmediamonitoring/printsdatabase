import HeadlinesModal from "@/app/ui/headlinesmodal";
import SelectCountry from "@/app/ui/selectcountry"
import { getCompanies } from "@/app/lib/getCompanies";
import { getIndustries } from "@/app/lib/getIndustries";
import { getCategories } from "@/app/lib/getCategories";
import { getPublications } from "@/app/lib/getPublications";
import { getOnlinePublications } from "@/app/lib/getPublicationsOnline";
import { getHeadlines } from "@/app/lib/getHeadlines";

import TableSkeleton from "@/app/ui/skeletons";
import { Suspense } from "react";
import HeadlinesTable from "@/app/ui/headlinestable";

export default async function Headline({ searchParams }) {
    const sParams = await searchParams;
    let query = sParams.query || "";

    let companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    let publications = await getPublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    let onlinepublications = await getOnlinePublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    let headlines = await getHeadlines(query);

    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Publications = JSON.parse(JSON.stringify(publications));
    const OnlinePublications = JSON.parse(JSON.stringify(onlinepublications));
    const Headlines = JSON.parse(JSON.stringify(headlines));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                        <div>
                            <SelectCountry />
                            <h1 className=" text-3xl text-black font-notosans font-bold ">Headlines</h1>
                            <span className="label-text text-black">Add, Edit <span className=" font-medium text-black">, View all</span> or <span className="font-medium text-red-700">Delete a Headline </span>here.</span>
                        </div>
                        <HeadlinesModal
                            Companies={Companies}
                            Industries={Industries}
                            Categories={Categories}
                            Publications={Publications}
                            Onlinepublications={OnlinePublications}
                        />
                    </div>
                </div>
                <Suspense fallback={<TableSkeleton />}>
                    <HeadlinesTable
                        Headlines={Headlines.reverse()}
                        Industries={Industries}
                    />
                </Suspense>
            </div>
        </>
    )
}