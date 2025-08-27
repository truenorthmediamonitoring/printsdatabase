import connectDB from "./utils";
import User from "./models/user";

export async function getAllUsers() {
    try {
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Getting all users...");
        const res = await User.find();
        console.log("All users available.");
        return res

    } catch (error) {
        console.log(error);
    }
}