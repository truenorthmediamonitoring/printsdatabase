import connectDB from "./utils";
import Headline from "./models/headline";

export default async function getAHeadline(id) {
    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting Headline...");
        const headline = await Headline.findById({ _id: id })
        console.log(headline);
        return headline;

    } catch (error) {
        console.error(error);
    }
}
