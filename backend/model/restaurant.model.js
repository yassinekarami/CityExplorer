import mongoose from "mongoose"

const { Schema } = mongoose;

const restaurantSchema = new Schema({
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
})


export const Restaurant = mongoose.model("Restaurant", restaurantSchema);