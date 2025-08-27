import { NextResponse } from "next/server";
import * as XLSX from "xlsx"
import { getNewsItems } from "@/app/lib/getNewsItems";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const monthParam = searchParams.get("month");
    // console.log(searchParams);

    // Fetch data
    const newsitems = await getNewsItems();
    const jsonNewsItems = JSON.parse(JSON.stringify(newsitems));

    // Filter by month if provided
    const filteredByMonth = monthParam
        ? jsonNewsItems.filter((item) => {
            const itemMonth = new Date(item.date).toISOString().slice(0, 7); // 'YYYY-MM'
            return itemMonth === monthParam;
        })
        : jsonNewsItems;

    // Remove _id and __v fields
    const finalData = filteredByMonth.map(({ _id, __v, date, sources, url, ...rest }) => ({
        ...rest,
        date: new Date(date).toISOString().split("T")[0], // Formats date as YYYY-MM-DD
        sources: sources.join(", "), // Converts array to comma-separated string
        url: `=HYPERLINK("${url}", "Get audio")`,
    }));

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(finalData);

    // Ensure url formula is kept as formula, not string
    Object.keys(ws).forEach((cellKey) => {
        if (ws[cellKey].v && typeof ws[cellKey].v === "string" && ws[cellKey].v.startsWith("=HYPERLINK")) {
            ws[cellKey].f = ws[cellKey].v;
            delete ws[cellKey].v;
        }
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "NewsItems");

    // Generate buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Set response headers
    const headers = new Headers();
    headers.append("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    headers.append("Content-Disposition", "attachment; filename=headlines.xlsx");

    return new NextResponse(buffer, { headers });

}