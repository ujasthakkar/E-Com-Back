require('dotenv').config()
const port = process.env.PORT || 4001;

const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const User = require("./models/user");
const products = require("./models/product.js");
const orders = require("./models/order.js");



const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() =>{
    console.log("DB CONNECTED")
});


app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());



app.use("/api", authRoutes);
app.use("/api", userRoutes);






//Starting a server 
app.listen(port, () =>{
    console.log(`app is running at ${port}`);
})
