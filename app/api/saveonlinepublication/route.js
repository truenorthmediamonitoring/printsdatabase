import connectDB from "@/app/lib/utils";
import { Publicationonline } from "@/app/lib/models/publication";

export async function POST(request) {
    try {
        const req = await request.json();
        const { publication, country } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const onlinepublication = await Publicationonline({
            country: country,
            publication: publication,
        }).save()
        console.log("Publication saved.");
        console.log(onlinepublication);

        return Response.json({ okay: "Online Publication saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}