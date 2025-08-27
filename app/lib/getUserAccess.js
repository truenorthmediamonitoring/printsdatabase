import connectDB from "./utils";
import User from "./models/user";

export default async function userAccess(email) {
    try {
        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected");

        console.log("Finding User...");
        const user = await User.find({ email: email });
        // console.log(user.length);

        if (user.length > 0) {
            return user[0].access;
        } else {
            return "User"
        }

    } catch (error) {
        console.error(error);
    }
}