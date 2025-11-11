
import { MongoClient } from 'mongodb';
import { ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({ path: './.env' })
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const mangoClient = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const db = mangoClient.db("CityExplorer");
const favoriteCol = db.collection("Favorite");


export {mangoClient, db, favoriteCol}