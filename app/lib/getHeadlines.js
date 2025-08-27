import connectDB from "./utils";
import Headline from "./models/headline";

export async function getHeadlines(term) {

    try {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        if (!term) {
            const res = await Headline.find()
            console.log("Getting all Headlines...");
            return res;
        } else {
            const res = await Headline.find({ $text: { $search: term }});
            return res;
        }


    } catch (error) {
        console.error(error);
    }
}