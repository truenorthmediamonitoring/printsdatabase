import connectDB from "@/app/lib/utils";
import Industry from "@/app/lib/models/industry";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Deleting  document...");
        const delindustry = await Industry.findByIdAndDelete({ _id: req.id })
        console.log(delindustry);

        return Response.json({ okay: "Success" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}