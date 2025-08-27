import { Schema, model, models } from "mongoose";

const industrySchema = new Schema({
    industry: {
        type: String,
        required: true,
    },
})

const Industry = models.Industry || model("Industry", industrySchema);
export default Industry;