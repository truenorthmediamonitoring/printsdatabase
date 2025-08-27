import connectDB from "./utils";
import AdvertEntry from "./models/advert";

export default async function getAnAdvert(id) {
    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting Advert...");
        const advert = await AdvertEntry.findById({ _id: id });
        console.log(advert);
        return advert;

    } catch (error) {
        console.error(error);
    }

}
