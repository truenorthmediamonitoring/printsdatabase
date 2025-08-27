import SelectCountry from "@/app/ui/selectcountry";
import { getCompanies } from "@/app/lib/getCompanies";
import { getIndustries } from "@/app/lib/getIndustries";
import { getCategories } from "@/app/lib/getCategories";
import { getSources } from "@/app/lib/getSources";
import { getNewsSegment } from "@/app/lib/getNewsSegment";
import NewsItemEditForm from "@/app/ui/newsitemeditfom";
import getANewsItem from "@/app/lib/getANewsItem";

export default async function Page({ params, searchParams }) {
    const { id } = await params;
    const newsitem = await getANewsItem(id[1]);

    const sParams = await searchParams;
    let query = sParams.query || "";

    let companies = await getCompanies(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const industries = await getIndustries();
    const categories = await getCategories();
    let sources = await getSources(query === "Ghana" || query === "Nigeria" || query === "Côte d'Ivoire" ? query : "");
    const newssegments = await getNewsSegment();

    const Companies = JSON.parse(JSON.stringify(companies));
    const Industries = JSON.parse(JSON.stringify(industries));
    const Categories = JSON.parse(JSON.stringify(categories));
    const Sources = JSON.parse(JSON.stringify(sources));
    const NewsSegment = JSON.parse(JSON.stringify(newssegments));
    const NewsItem = JSON.parse(JSON.stringify(newsitem));

    return (
        <>
            <div className="py-6 md:pt-24 px-4 h-screen md:px-10 rounded-lg bg-white shadow-sm overflow-scroll">
                <div className="mb-10">
                    <div className="flex flex-col md:flex-row gap-2 justify-between items-start">
                        <div>
                            <SelectCountry />
                            <h1 className=" text-3xl font-notosans font-bold text-black leading-none">Edit News Item</h1>
                            <span className="text-xs font-medium leading-none text-zinc-400">{id[1]}</span>
                        </div>
                    </div>
                </div>
                <NewsItemEditForm
                    Companies={Companies}
                    Industries={Industries}
                    Categories={Categories}
                    Sources={Sources}
                    NewsSegment={NewsSegment}
                    ID={id[1]}
                    NewsItem={NewsItem}
                />
            </div>
        </>
    )
}