import connectDB from "@/app/lib/utils";
import Company from "@/app/lib/models/company";

export async function POST(request) {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { company, country } = req;
        console.log(req);


        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newcompany = await Company({
            company: company,
            country: country
        }).save()
        console.log("Company saved...");
        console.log(newcompany);

        return Response.json({ okay: "Company saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}