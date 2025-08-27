import connectDB from "@/app/lib/utils";
import Category from "@/app/lib/models/category";


export async function POST(request) {
    try {
        const req = await request.json();
        const { category, id } = req;
        console.log(req);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Editing Document...");
        const editedcategory = await Category.findByIdAndUpdate(
            id,
            { category }
        )
        console.log(editedcategory);
        
        return Response.json({ okay: "Category edited" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}