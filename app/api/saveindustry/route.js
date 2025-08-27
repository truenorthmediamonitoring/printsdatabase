import connectDB from "@/app/lib/utils";
import Industry from "@/app/lib/models/industry";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { industry } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newindustry = await Industry({
            industry: industry,
        }).save()
        console.log(newindustry);

        return Response.json({ okay: "Industry saved" }, { status: 200 });
        
    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}