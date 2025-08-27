import connectDB from "./utils";
import NewsItem from "./models/newsitem";

export default async function getANewsItem(id) {
    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting News Item");
        const newsitem = await NewsItem.findById({ _id: id })
        console.log(newsitem);
        return newsitem;

    } catch (error) {
        console.error(error);
    }
}