import { Schema, model, models } from "mongoose";

const sourceSchema = new Schema({
    source: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

sourceSchema.index({ source: "text", country: "text" });

const Source = models.Source || model("Source", sourceSchema);
export default Source;