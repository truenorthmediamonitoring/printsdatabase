import connectDB from "@/app/lib/utils";
import NewsSegment from "@/app/lib/models/newssegment";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newsegemnt = await NewsSegment({
            newssegment: req.newssegment,
        }).save()
        console.log("News Segment saved...");
        console.log(newsegemnt);


        return Response.json({ okay: "News Segment saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}