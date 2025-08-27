import connectDB from "@/app/lib/utils";
import User from "@/app/lib/models/user";
import { hashPass } from "@/app/lib/bcrypt";

export async function POST(request) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
        const req = await request.json();
        const { firstname, lastname, email, access, password } = req;
        const hashedPassword = await hashPass(password);

        console.log("Connecting to database...");
        await connectDB();
        console.log("Connected.");

        console.log("Creating user document...");
        const newuser = await User({
            fname: firstname,
            lname: lastname,
            email: email,
            access: access,
            password: hashedPassword,
        }).save()
        console.log("User created successfully...");
        console.log(newuser);

        return Response.json({ okay: "User created" }, { status: 200 });

    } catch (error) {
        console.error('An error occured', error);
        return Response.json({ error: 'An error occured' }, { status: 500 });
    }
}