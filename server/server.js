const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cors());

//for json stringify
app.use(express.json());
app.use(cookieParser("CMS"));

//connecting to database
mongoose
  .connect(
    "mongodb+srv://admin:admin@cafemanagement.oqoixqk.mongodb.net/?retryWrites=true&w=majority",
    {}
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.post("/getUser", async (req, res) => {
  //finding the user
  try{
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    const Users = await UserModel.findOne({ username: username });

    if(Users == null){
      return res.send("error bruh")
    }
    else if(username ===  Users.username && password === Users.password){
      return res.json({
        name: Users.name,
        username: Users.username,
      });
    }

    return res.send("error bruh");
    
  }catch(err){
    console.log(err);
  }
  
});

app.post("/createUser", async (req, res) => {
  //getting data from request body
  try{
    const user = req.body;

    //creating new user in usermodel
    const newUser = new UserModel(user);
    await newUser.save();
    res.json("newUser");
  }catch(err){
    console.log(err);
  }
});

app.listen(5000, () => {
  console.log("server is running on 5000");
});
