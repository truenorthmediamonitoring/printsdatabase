import connectDB from "./utils";
import NewsItem from "./models/newsitem";

export async function getNewsItems(term) {

    try {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        if (!term) {
            const res = await NewsItem.find();
            console.log("Getting all News Items...");
            return res;
        } else {
            const res = await NewsItem.find({ $text: { $search: term }});
            return res;
        }


    } catch (error) {
        console.error(error);
    }
}