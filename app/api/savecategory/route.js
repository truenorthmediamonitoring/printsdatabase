import connectDB from "@/app/lib/utils";
import Category from "@/app/lib/models/category";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating document...");
        const newcategory = await Category({
            category: req.category,
        }).save()
        console.log(newcategory);
        
        return Response.json({ okay: "Category saved" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }

}