import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI ?? "mongodb://localhost:27017"

export const connectDB = async function () {
    try{
        await mongoose.connect(MONGODB_URI)
    } catch (error) {
    console.error("MongoDB connection error:", error)
    }
}