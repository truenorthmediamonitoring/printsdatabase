import { NextResponse } from "next/server";
import * as XLSX from "xlsx"
import { getHeadlines } from "@/app/lib/getHeadlines";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    // const monthParam = searchParams.get("month");
    console.log(searchParams);
    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const industry = searchParams.get("industry");

    // Fetch data
    let headlines = await getHeadlines();
    const jsonHeadlines = JSON.parse(JSON.stringify(headlines));


    // Filter by month if provided
    // const filteredByMonth = monthParam
    //     ? jsonHeadlines.filter((item) => {
    //         const itemMonth = new Date(item.date).toISOString().slice(0, 7); // 'YYYY-MM'
    //         return itemMonth === monthParam;
    //     })
    //     : jsonHeadlines;

    // Conditional filtering by date range + industry
    const filteredByRange = jsonHeadlines.filter((item) => {
        const itemDate = new Date(item.date);
        const isAfterStart = start ? itemDate >= new Date(start) : true;
        const isBeforeEnd = end ? itemDate <= new Date(end) : true;
        const matchesIndustry = industry ? item.industry === industry : true;

        return isAfterStart && isBeforeEnd && matchesIndustry;
    });

    // // Previous Logic

    // // // Remove _id and __v fields
    // // const finalData = filteredByRange.map(({ _id, __v, date, publications, onlinepublications, pages, themes, ...rest }) => ({
    // //     ...rest,
    // //     date: new Date(date).toISOString().split("T")[0], // Formats date as YYYY-MM-DD
    // //     publications: publications.join(", "), // Converts array to comma-separated string
    // //     publicationCount: publications.length,
    // //     onlinepublications: onlinepublications.join(", "), // Converts array to comma-separated string
    // //     onlinepublicationsCount: onlinepublications.length,
    // //     pages: pages.join(", "), // Converts array to comma-separated string
    // //     themes: themes.join(", "), // Converts array to comma-separated string
    // // }));

    // // Previous Logic


    // // Updated Logic
    // Expand each array item into its own row (split publications and onlinepublications)
    const expanded = filteredByRange.flatMap(({ _id, __v, date, publications = [], onlinepublications = [], pages = [], themes = [], ...rest }) => {
        const formattedDate = new Date(date).toISOString().split("T")[0];

        const printRows = publications.map(pub => ({
            ...rest,
            date: formattedDate,
            publication: pub,
            onlinepublication: "",
            pages: pages.join(", "),
            themes: themes.join(", ")
        }));

        const onlineRows = onlinepublications.map(pub => ({
            ...rest,
            date: formattedDate,
            publication: "",
            onlinepublication: pub,
            pages: pages.join(", "),
            themes: themes.join(", ")
        }));

        return [...printRows, ...onlineRows];
    });
    // // Updated Logic


    // Convert data to worksheet
    // const ws = XLSX.utils.json_to_sheet(finalData);
    const ws = XLSX.utils.json_to_sheet(expanded);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Headlines");

    // Generate buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers
    const headers = new Headers();
    headers.append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.append("Content-Disposition", "attachment; filename=headlines.xlsx");

    return new NextResponse(buffer, { headers });
}