import connectDB from "@/app/lib/utils";
import AdvertEntry from "@/app/lib/models/advert";

export async function POST(request) {

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const req = await request.json();
    console.log(req);

    const {
        company,
        industry,
        category,
        multiplepublications,
        adsize,
        rate,
        identifier,
        date,
        selectedpages,
        colorformat,
        url,
        country,
    } = req;

    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");

        const newAdvertEntry = await new AdvertEntry({
            company: company,
            industry: industry,
            category: category,
            publications: multiplepublications,
            adsize: adsize,
            rate: rate,
            identifier: identifier,
            date: date,
            pages: selectedpages,
            colorformat: colorformat,
            imageurl: url,
            country: country,
        })

        const okay = await newAdvertEntry.save();
        console.log("Document created successfully...");

        return Response.json({ okay: "Entry saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}