import connectDB from "@/app/lib/utils";
import Headline from "@/app/lib/models/headline";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {

        const req = await request.json();
        console.log(req);

        const { ID, company, industry, category, multiplepublications, multipleonlinepublications, selectedpages, prominence, withpictures,
            focus, date, headline, theme, tone, country } = req;

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Editiing document...");
        const editedheadline = await Headline.findByIdAndUpdate(
            ID,
            {
                company,
                industry,
                category,
                publications: multiplepublications,
                onlinepublications: multipleonlinepublications,
                pages: selectedpages,
                prominence: prominence,
                withpictures: withpictures,
                focus: focus,
                date: new Date(date),
                headline,
                themes: theme,
                tone,
                country
            },
            { new: true, runValidators: true } // Return updated document & validate fields
        )

        console.log(editedheadline);

        return Response.json({ okay: "Headline Edited" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}