import connectDB from "@/app/lib/utils";
import Industry from "@/app/lib/models/industry";

export async function POST(request) {

    try {
        const req = await request.json();
        const { industry, id } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Editing document...");
        const editindustry = await Industry.findByIdAndUpdate(
            id,
            { industry }
        )
        console.log(editindustry);
        
        return Response.json({ okay: "Industry edited" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}