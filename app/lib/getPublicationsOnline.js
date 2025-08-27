import connectDB from "./utils";
import { Publicationonline } from "./models/publication";

export async function getOnlinePublications(country) {
    
    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting all Publications...");
        if (!country) {
            const res = await Publicationonline.find();
            console.log("All publication available");
            return res;
        } else {
            const res = await Publicationonline.find({ $text: { $search: country } });
            console.log("All publication available in specified country available");
            return res;
        }

    } catch (error) {
        console.error(error);
    }
}