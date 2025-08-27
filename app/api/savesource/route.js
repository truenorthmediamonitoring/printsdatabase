import connectDB from "@/app/lib/utils";
import Source from "@/app/lib/models/source";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { source, country } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newsource = await Source({
            country: country,
            source: source,
        }).save();
        console.log("Source saved...");
        console.log(newsource);

        return Response.json({ okay: "Source saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}