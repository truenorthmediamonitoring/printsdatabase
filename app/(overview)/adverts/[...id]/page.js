import SelectCountry from "@/app/ui/selectcountry";

import { getCompanies } from "@/app/lib/getCompanies";
import { getIndustries } from "@/app/lib/getIndustries";
import { getCategories } from "@/app/lib/getCategories";
import { getPublications } from "@/app/lib/getPublications";
import AdvertEditForm from "@/app/ui/adverteditform";
import getAnAdvert from "@/app/lib/getAnAdvert";

export default async function Page({ params, searchParams }) {
    const { id } = await params;
    // console.log(id);
    const advert = await getAnAdvert(id[1])

    const sParams = await searchParams;
    let query = sParams.query || "";

    const companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    const publications = await getPublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "")

    // Convert data to a plain object
    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Publications = JSON.parse(JSON.stringify(publications));
    const Advert = JSON.parse(JSON.stringify(advert));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                        <div>
                            <SelectCountry />
                            <h1 className=" text-3xl font-notosans font-bold text-black leading-none">Edit Advert</h1>
                            <span className="text-xs font-medium leading-none text-zinc-400">{id[1]}</span>
                        </div>
                    </div>
                </div>
                {/* Form Here  */}

                <AdvertEditForm
                    Companies={Companies}
                    Industries={Industries}
                    Categories={Categories}
                    Publications={Publications}
                    Advert={Advert}
                    ID={id[1]}
                />
            </div>
        </>
    )
}