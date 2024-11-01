import mongoose from "mongoose";

const connection = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error.message);
        throw error;  // Optional: rethrow to handle it elsewhere if needed
    }
};

export default connection