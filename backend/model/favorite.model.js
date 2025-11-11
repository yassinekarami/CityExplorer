import mongoose from "mongoose";

const { Schema } = mongoose;

const favoriteSchema = new Schema({
    userId: {
        type: String
    },
    nomoffre: {
        type: String
    },
    type: {
        type: String,
    },
    codepostal: {
        type: String
    },
    commune: {
        type: String
    },
    commail: {
        type: String
    },
    departement:{
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    }
});

export const Favorite = mongoose.model("Favorite", favoriteSchema)