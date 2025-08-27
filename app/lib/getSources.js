import connectDB from "./utils";
import Source from "./models/source";

export async function getSources(country) {

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting all Sources...");
        if (!country) {
            const res = await Source.find();
            console.log("All sources available");
            return res;
        } else if (country) {
            const res = await Source.find({ $text: { $search: country } });
            console.log("All companies in specified country available");
            return res;
        }


    } catch (error) {
        console.error(error);
    }

}