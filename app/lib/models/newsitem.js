import { Schema, model, models } from "mongoose";

const newsitemschema = new Schema({
    company: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    sources: {
        type: [String],
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    newssegment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    tone: {
        type: String,
        required: true,
    },
    ave: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
})

newsitemschema.index({ company: "text", sources: "text", headline: "text", date: 1, country: "text" });

const NewsItem = models?.NewsItem || model("NewsItem", newsitemschema)

export default NewsItem;