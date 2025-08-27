import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    access: {
        type: String,
    },
    password: {
        type: String,
    },
});

userSchema.index({ fname: "text", lname: "text", email: "text" });

const User = models.User || model("User", userSchema);
export default User;