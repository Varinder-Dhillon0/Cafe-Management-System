require("dotenv").config();
const mongoose = require("mongoose");

// Connecting to the database
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB);
        console.log(`Database is running now.`);
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
};

module.exports = connectDb;
