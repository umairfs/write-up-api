const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDB = async() => {
    await mongoose.connect(`${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`)
};

module.exports = connectDB;
