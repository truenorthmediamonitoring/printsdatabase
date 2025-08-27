import connectDB from "./utils";
import AdvertEntry from "./models/advert";

export async function getAdvertEntries(term) {
    
    try {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        if(!term){
            const res = await AdvertEntry.find();
            console.log("All entries available...");
            return res
        } else{
            const res = await AdvertEntry.find({ $text: { $search: term }})
            return res;
        }

        
    } catch (error) {
        console.error(error);
    }

}