const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ProductCartSchema = new mongoose.Schema({
	product: {
		type: ObjectId,
		ref: "Product",
	},
	name: String,
	quantity: Number,
	price: Number,
});
const ProductCart = mongoose.model("ProductCart", ProductCartSchema);

const OrderSchema = new mongoose.Schema(
	{
		products: [ProductCartSchema],
		transaction_id: {},
		amount: { type: Number },
		address: String,
		deliveryTime: String,
		status: {
			type: String,
			//canteen - new
			default: "Processing",
			enum: ["Cancelled", "Processing", "Recieved"],
		},
		paid: {
			type: Boolean,
			default: false,
		},
		refundApproval: {
			type: Boolean,
			default: false,
		},
		updated: Date,
		user: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, ProductCart };
