import connectDB from "@/app/lib/utils";
import { Publication } from "@/app/lib/models/publication";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { publication, country } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newpublication = await Publication({
            country: country,
            publication: publication,
        }).save()
        console.log("Publication saved.");
        console.log(newpublication);

        return Response.json({ okay: "Publication saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}