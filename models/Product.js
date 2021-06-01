const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			maxlength: 32,
		},
		description: {
			type: String,
			trim: true,
			required: true,
			maxlength: 2000,
		},
		price: {
			type: Number,
			trim: true,
			required: true,
			maxlength: 32,
		},
		category: {
			type: ObjectId,
			ref: "Category",
			required: true,
		},

		//canteen-new
		availability: {
			type: Boolean,
			default: true,
		},
		quantity: {
			type: Number,
			default: 0,
		},
		counterValue: {
			type: Number,
			default: 1,
		},
		inCart: {
			type: Boolean,
			default: false,
		},

		photo: {
			data: Buffer,
			contentType: String,
		},
	},
	{ timestamps: true }
);

//export the model as Products
module.exports = mongoose.model("Products", productSchema);
