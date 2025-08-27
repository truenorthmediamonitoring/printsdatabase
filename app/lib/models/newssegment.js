import { Schema, model, models } from "mongoose";

const newsSegmentSchema = new Schema({
    newssegment: {
        type: String,
        required: true,
    },
})

const NewsSegment = models.NewsSegment || model("NewsSegment", newsSegmentSchema);
export default NewsSegment;