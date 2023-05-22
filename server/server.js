const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Razorpay = require("razorpay");
const {config} = require("dotenv");
const crypto = require("crypto");

config({path : "../.env"})

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

//for json stringify
app.use(express.json());
app.use(cookieParser("CMS"));

var instance = new Razorpay({
  key_id: "rzp_test_BjlHWZayRvsAJi",
  key_secret: "SChmQXGXuw1eoUsjSfirx1NN",
});

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

app.post("/getCart",async (req,res) =>{
  const user = req.body.username;
  const Users = await UserModel.findOne({ username: user });

  if(Users?.cart != null){
    Users.cart ? res.json(Users.cart) : res.json([]);
  }
})

app.post("/updateCart", async (req,res) =>{
    const cart = req.body.cart;
    const username = req.body.username;
    const total = req.body.cartTotal;
    await UserModel.findOneAndUpdate({username: username}, {cart: cart, cartTotal : total});
    console.log(cart,username)
    res.send("Success");
})

app.post("/checkout", async(req,res) =>{
  const options = {
    amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
    currency: "INR",
  };
  const order = await instance.orders.create(options).catch((err) => console.log(err));
  
  res.status(200).json({
    success : true,
    order
  })
})


app.post("/paymentverification", async(req,res) =>{

  const {razorpay_order_id, razorpay_payment_id,razorpay_signature} = req.body;

  let body=razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto.createHmac('sha256', "SChmQXGXuw1eoUsjSfirx1NN")
                                  .update(body.toString())
                                  .digest('hex');

  const isMatched = expectedSignature === razorpay_signature;
  if(isMatched){

    await instance.payments.fetch(req.body.razorpay_payment_id).then(async (payment) => {
      const {amount,order_id,method,created_at} = payment;
      const cart = [];
      const total = 0;
      const {username} = req.query

      const date = new Date(created_at * 1000); // Multiply by 1000 to convert seconds to milliseconds
        
      // Format the date using the toLocaleString method
      const time = date.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      });

      const order_details = {amount,order_id,method,time}

      const data = await UserModel.findOneAndUpdate(
        { username: username },
        { cart: cart, cartTotal : total, $push: { AllOrders: { $each: [order_details] } } },
        { new: true }
      );

      console.log(data);

    }).catch((error) => {
      console.log(error);
    });

    res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`);
  }else{
    res.status(400).json({
      success : false
    })
  }
})

app.post("/getOrders", async (req,res) =>{
  const {username} = req.body

  const User = await UserModel.findOne({username : username });

  if(User?.AllOrders != null){
    User.AllOrders ? res.json(User.AllOrders) : res.json([]);
  }

})

app.listen(5000, () => {
  console.log("server is running on 5000");
});
