import { Schema, model, models } from "mongoose";

const advertentryschema = new Schema({
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
    pages: {
        type: [String],
        required: true,
    },
    adsize: {
        type: String,
        required: true,
    },
    rate: {
        type: String,
        required: true,
    },
    identifier: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    colorformat: {
        type: String,
        required: true,
    },
    imageurl: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
})

advertentryschema.index({ company: "text", publications: "text", identifier: "text", date: 1, country: "text" })

const AdvertEntry = models?.AdvertEntry || model("AdvertEntry", advertentryschema)

export default AdvertEntry;