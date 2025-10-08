const mongoose = require("mongoose");

const connectDB = async() => {
    await mongoose.connect(`${process.env.DATABASE_HOST}/${process.env.DATABASE_NAME}`)
};

module.exports = connectDB;
