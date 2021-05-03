require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user");
const Product = require("./models/product");


const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const userprofile = require("./routes/userprof");
const uploadRoutes = require("./routes/upload");
const userfav = require("./routes/userfav");

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() =>{
    console.log("DB CONNECTED")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/userprof',userprofile);
app.use("/api", uploadRoutes);
app.use("/api", userfav);

const port = process.env.PORT || 4000;
//Starting a server 
app.listen(port, () =>{
    console.log(`app is running at ${port}`);
})
