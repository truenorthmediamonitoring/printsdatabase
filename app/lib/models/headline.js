import { Schema, model, models } from "mongoose";

const headlineschema = new Schema({
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
    publications: {
        type: [String],
        required: true,
    },
    onlinepublications: {
        type: [String],
        required: true,
    },
    pages: {
        type: [String],
        required: true,
    },
    prominence: {
        type: String,
        required: true,
    },
    withpictures: {
        type: String,
        required: true,
    },
    focus: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    themes: {
        type: [String],
        required: true,
    },
    tone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

headlineschema.index({ company: "text", publications: "text", headline: "text", country: "text" });

const Headline = models?.Headline || model("Headline", headlineschema);

export default Headline;