import connectDB from "@/app/lib/utils";
import Source from "@/app/lib/models/source";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Deleting  document...");
        const delsource = await Source.findByIdAndDelete({ _id: req.id })
        
        return Response.json({ okay: "Success" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}