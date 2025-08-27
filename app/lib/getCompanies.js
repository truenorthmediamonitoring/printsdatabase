import connectDB from "./utils";
import Company from "./models/company";

export async function getCompanies(country) {
    // console.log(country);

    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting all Companies...");
        if (!country) {
            const res = await Company.find();
            console.log("All companies available");
            return res
        } else {
            const res = await Company.find({ $text: { $search: country }});
            console.log("All companies in specified country available");
            // console.log(res);
            return res
        }

    } catch (error) {
        console.error(error);
    }

}