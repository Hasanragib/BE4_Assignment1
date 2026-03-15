require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => console.log("error connecting database", error));
};

module.exports = { initializeDatabase };
