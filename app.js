require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
// const userRoutes = require("./routes/user");
// const categoryRoutes = require("./routes/category");
// const productRoutes = require("./routes/product");
// const OrderRoutes = require("./routes/order")

//can change the name from /test in the url below to any other name
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes)
// app.use("/api", userRoutes)
// app.use("/api",categoryRoutes)
// app.use("/api", productRoutes)
// app.use("/api",OrderRoutes)


const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`the app is running at ${port}`);
})
