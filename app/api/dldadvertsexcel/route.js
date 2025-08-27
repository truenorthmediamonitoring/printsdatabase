import { NextResponse } from "next/server";
import * as XLSX from "xlsx"
import { getAdvertEntries } from "@/app/lib/getAdvertEntries";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const monthParam = searchParams.get("month");
    const industryParam = searchParams.get("industry");

    console.log(monthParam);
    console.log(industryParam);


    // Fetch data
    let adverts = await getAdvertEntries();
    const jsonAdverts = JSON.parse(JSON.stringify(adverts));

    // // Filter by month if provided
    // const filteredByMonth = monthParam
    //     ? jsonAdverts.filter((item) => {
    //         const itemMonth = new Date(item.date).toISOString().slice(0, 7); // 'YYYY-MM'
    //         return itemMonth === monthParam;
    //     })
    //     : jsonAdverts;


    // Conditional filtering
    const filteredAdverts = jsonAdverts.filter((item) => {
        const matchesMonth = monthParam
            ? new Date(item.date).toISOString().slice(0, 7) === monthParam
            : true;

        const matchesIndustry = industryParam
            ? item.industry === industryParam
            : true;

        return matchesMonth && matchesIndustry;
    });


    // Remove _id and __v fields
    const finalData = filteredAdverts.map(({ _id, __v, date, publications, pages, imageurl, ...rest }) => ({
        ...rest,
        date: new Date(date).toISOString().split("T")[0], // Formats date as YYYY-MM-DD
        publications: publications.join(", "), // Converts array to comma-separated string
        pages: pages.join(", "), // Converts array to comma-separated string
        imageurl: `=HYPERLINK("${imageurl}", "View Image")`,
    }));

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(finalData);

    // Ensure imageurl formula is kept as formula, not string
    Object.keys(ws).forEach((cellKey) => {
        if (ws[cellKey].v && typeof ws[cellKey].v === "string" && ws[cellKey].v.startsWith("=HYPERLINK")) {
            ws[cellKey].f = ws[cellKey].v;
            delete ws[cellKey].v;
        }
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Adverts");

    // Generate buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers
    const headers = new Headers();
    headers.append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.append("Content-Disposition", "attachment; filename=headlines.xlsx");

    return new NextResponse(buffer, { headers });
}