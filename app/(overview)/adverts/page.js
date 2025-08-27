import AdvertEntryModal from "@/app/ui/advertentrymodal"
import AdvertEntriesTable from "@/app/ui/advertentriestable"
import TableSkeleton from "@/app/ui/skeletons"
import { Suspense } from "react"
import { getCompanies } from "@/app/lib/getCompanies"
import { getIndustries } from "@/app/lib/getIndustries"
import { getCategories } from "@/app/lib/getCategories"
import { getPublications } from "@/app/lib/getPublications"
import { getAdvertEntries } from "@/app/lib/getAdvertEntries"
import SelectCountry from "@/app/ui/selectcountry"

export default async function Advert({ searchParams }) {
    const sParams = await searchParams;
    let query = sParams.query || "";

    const companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    const publications = await getPublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "")
    const advertEntries = await getAdvertEntries(query)

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Publications = JSON.parse(JSON.stringify(publications));
    const Adverts = JSON.parse(JSON.stringify(advertEntries));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                        <div>
                            <SelectCountry />
                            <h1 className=" text-3xl text-black font-notosans font-bold ">Adverts</h1>
                            <span className="label-text text-black">Add a <span className=" font-medium text-black">New Entry, View all Entries</span> or <span className="font-medium text-red-700">Delete an Entry </span>here.</span>
                        </div>
                        <AdvertEntryModal
                            Companies={Companies}
                            Industries={Industries}
                            Categories={Categories}
                            Publications={Publications}
                        />
                    </div>
                </div>
                <Suspense fallback={<TableSkeleton />}>
                    <AdvertEntriesTable
                        Adverts={Adverts.reverse()}
                        Industries={Industries}
                    />
                </Suspense>
            </div>
        </>

    )
}