import { getCompanies } from "@/app/lib/getCompanies";
import { getIndustries } from "@/app/lib/getIndustries";
import { getCategories } from "@/app/lib/getCategories";
import { getPublications } from "@/app/lib/getPublications";
import { getOnlinePublications } from "@/app/lib/getPublicationsOnline";
import getAHeadline from "@/app/lib/getAHeadline";
import HeadlineEditForm from "@/app/ui/headlineditform";
import SelectCountry from "@/app/ui/selectcountry";


export default async function Page({ params, searchParams }) {
    const { id } = await params;
    // console.log(id);
    const headline = await getAHeadline(id[1])

    const sParams = await searchParams;
    let query = sParams.query || "";

    let companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    let publications = await getPublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    let onlinepublications = await getOnlinePublications(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");

    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Publications = JSON.parse(JSON.stringify(publications));
    const OnlinePublications = JSON.parse(JSON.stringify(onlinepublications));
    const Headline = JSON.parse(JSON.stringify(headline));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                        <div>
                            <SelectCountry />
                            <h1 className=" text-3xl font-notosans font-bold text-black leading-none">Edit Headline</h1>
                            <span className="text-xs font-medium leading-none text-zinc-400">{id}</span>
                        </div>
                    </div>
                </div>

                {/* Form Here  */}
                <HeadlineEditForm
                    Companies={Companies}
                    Industries={Industries}
                    Categories={Categories}
                    Publications={Publications}
                    OnlinePublications={OnlinePublications}
                    Headline={Headline}
                    ID={id[1]}
                />
            </div>
        </>
    )
}