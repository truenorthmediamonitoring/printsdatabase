import { Schema, model, models } from "mongoose";

const categorySchema = new Schema({
    category: {
        type: String,
        required: true,
    },
})

const Category = models.Category || model("Category", categorySchema);
export default Category;