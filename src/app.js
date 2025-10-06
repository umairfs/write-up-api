const express = require("express");
const connectDB = require("./config/database");
const UserModel = require("./models/user.js"); 

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signup", async (req, res) => {
    let reqBody = req.body;

    let user = new UserModel(reqBody);
    try {        
        await user.save();
        res.send("User Added Successfully")
    } catch (error) {
        res.status(400).send("error: "+JSON.stringify(err));
    }
});

app.get("/user", async (req, res) => {
    let { email } = req.query;

    try {        
        let user = await UserModel.find({emailId: email});
        if(!user.length) {
            res.status(404).send("User Not Found");
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("error: "+JSON.stringify(err));
    }
});

app.get("/feed", async (req, res) => {
    try {        
        let user = await UserModel.find({});
        if(!user.length) {
            res.status(404).send("No User Registered");
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("error: "+JSON.stringify(err));
    }
});

app.delete("/user", async (req, res) => {
    let { userId } = req.query;
    try {        
        let user = await UserModel.findOneAndDelete(userId);
        res.send(user)
    } catch (error) {
        res.status(400).send("error: "+JSON.stringify(err));
    }
});

connectDB().then(() => {
    console.log("DB connection successful.");
    app.listen(3000, () => {
        console.log(`Server is running on http//:localhost:3000`);
    })
}).catch((err) => {
    console.log("Error connecting DB")
});