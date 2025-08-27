import connectDB from "./utils";
import Category from "./models/category";

export async function getCategories() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Getting all Categories.");
        const res = await Category.find()
        console.log("All Categories available.");
        return res;

    } catch (error) {
        console.error(error);
    }

}