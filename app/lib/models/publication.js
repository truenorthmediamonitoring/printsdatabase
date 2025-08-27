import { Schema, model, models } from "mongoose";

const publicationSchema = new Schema({
    publication: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

publicationSchema.index({ publication: "text", country: "text" });

const Publication = models.Publication || model("Publication", publicationSchema);



const publicationOnlineSchema = new Schema({
    publication: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
});

publicationOnlineSchema.index({ publication: "text", country: "text" });

const Publicationonline = models.Publicationonline || model("Publicationonline", publicationOnlineSchema);




export { Publication, Publicationonline };