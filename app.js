require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const OrderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");

//can change the name from /test in the url below to any other name
mongoose.set("useFindAndModify", false);
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB CONNECTED");
	});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//My routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", OrderRoutes);
app.use("/api", stripeRoutes);

// app.post("/payments", (req, res) => {
// 	const { product, token } = req.body;
// 	console.log("Product", product);
// 	console.log("Price", product.price);
// 	const idempotencyKey = uuidv4();
// 	return stripe.customers
// 		.create({
// 			email: token.email,
// 			source: token.id,
// 		})
// 		.then((customer) => {
// 			stripe.charges.create(
// 				{
// 					amount: product.price * 100,
// 					currency: "usd",
// 					customer: customer.id,
// 					receipt_email: token.email,
// 					description: `purchase of product.name`, // product.name
// 					shipping: {
// 						name: token.card.name,
// 						address: {
// 							country: token.card.address_country,
// 						},
// 					},
// 				},
// 				{ idempotencyKey }
// 			);
// 		})
// 		.then((result) => res.status(200).json(result))
// 		.catch((err) => console.log(err));
// });

const port = process.env.PORT || 7000;

app.listen(port, () => {
	console.log(`the app is running at ${port}`);
});
