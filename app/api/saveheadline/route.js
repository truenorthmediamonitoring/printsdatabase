import connectDB from "@/app/lib/utils";
import Headline from "@/app/lib/models/headline";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {

        const req = await request.json();
        console.log(req);
        const { company, industry, category, multiplepublications, multipleonlinepublications, selectedpages, prominence, withpictures,
            focus, date, headline, theme, tone, country } = req;

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newheadline = await Headline({
            company: company,
            industry: industry,
            category: category,
            publications: multiplepublications,
            onlinepublications: multipleonlinepublications,
            pages: selectedpages,
            prominence: prominence,
            withpictures: withpictures,
            focus: focus,
            date: date,
            headline: headline,
            themes: theme,
            tone: tone,
            country: country,
        }).save()

        console.log(newheadline);
        console.log("Document created successfully...");

        return Response.json({ okay: "Headline saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}