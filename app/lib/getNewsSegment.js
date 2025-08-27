import connectDB from "./utils";
import NewsSegment from "./models/newssegment";

export async function getNewsSegment() {

    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Getting all News Segments.");
        const res = await NewsSegment.find();
        console.log("All News Segments available");
        return res;

    } catch (error) {
        console.error(error);
    }

}