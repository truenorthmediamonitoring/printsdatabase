import NewsItemModal from "@/app/ui/newsitemmodal"
import TableSkeleton from "@/app/ui/skeletons"
import { Suspense } from "react"

import { getCompanies } from "@/app/lib/getCompanies"
import { getIndustries } from "@/app/lib/getIndustries"
import { getCategories } from "@/app/lib/getCategories"
import { getSources } from "@/app/lib/getSources"
import { getNewsSegment } from "@/app/lib/getNewsSegment"
import { getNewsItems } from "@/app/lib/getNewsItems"
import NewsItemsTable from "@/app/ui/newsitemstable"
import SelectCountry from "@/app/ui/selectcountry"

export default async function NewsItem({ searchParams }) {
    const sParams = await searchParams;
    let query = sParams.query || "";

    let companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    let sources = await getSources(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const newssegments = await getNewsSegment();
    let newsitems = await getNewsItems(query);

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Sources = JSON.parse(JSON.stringify(sources));
    const NewsSegment = JSON.parse(JSON.stringify(newssegments));
    const Newsitems = JSON.parse(JSON.stringify(newsitems));
    
    return (<>
        <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
            <div className="mb-10">
                <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                    <div>
                        <SelectCountry />
                        <h1 className=" text-3xl text-black font-notosans font-bold ">News Items</h1>
                        <span className="label-text text-black">Add a <span className=" font-medium text-black">News item, View all Items</span> or <span className="font-medium text-red-700">Delete a News-item </span>here.</span>
                    </div>
                    <NewsItemModal
                        Companies={Companies}
                        Industries={Industries}
                        Categories={Categories}
                        Sources={Sources}
                        NewsSegment={NewsSegment}
                    />
                </div>
            </div>
            <Suspense fallback={<TableSkeleton />}>
                <NewsItemsTable NewsItems={Newsitems.reverse()} />
            </Suspense>
        </div>
    </>)
}