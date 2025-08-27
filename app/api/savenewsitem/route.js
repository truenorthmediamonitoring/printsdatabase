import connectDB from "@/app/lib/utils";
import NewsItem from "@/app/lib/models/newsitem";

export async function POST(request) {

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {

        const req = await request.json();
        // console.log(req);

        const { company, industry, category, multiplesources, headline, newssegment, date, url, tone, ave, country, summary  } = req;

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newnewsitem = await NewsItem({
            company: company,
            industry: industry,
            category: category,
            sources: multiplesources,
            headline: headline,
            newssegment: newssegment,
            date: date,
            url: url,
            tone: tone,
            ave: ave,
            country: country,
            summary: summary,
        }).save()

        console.log(newnewsitem);
        console.log("Document created successfully...");

        return Response.json({ okay: "News item saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}