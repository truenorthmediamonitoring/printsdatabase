import connectDB from "./utils";
import Industry from "./models/industry";

export async function getIndustries() {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Getting all industries...");
        const res = await Industry.find()
        console.log("All industries available...");
        return res

    } catch (error) {
        console.error(error);
    }
}