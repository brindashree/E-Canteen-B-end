const { isBuffer } = require("lodash");
const { Order, ProductCart } = require("../models/Order");

exports.getOrderById = (req, res, next, id) => {
	Order.findById(id).exec((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "No order found in DB",
			});
		}
		req.order = order;
		next();
	});
};

exports.createOrder = (req, res) => {
	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to save your ORDER in DB",
			});
		}
		res.json(order);
	});
};

exports.getAllOrders = (req, res) => {
	Order.find()
		.populate("user", "_id name")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Failed to get ORDER from DB",
				});
			}
			res.json(order);
		});
};

exports.getOrderStatus = (req, res) => {
	res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
	Order.updateOne(
		{ _id: req.body.orderId },
		{ $set: { status: req.body.status } },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Order Status",
				});
			}
			res.json(order);
		}
	);
};
exports.updateStatusConfirm = (req, res) => {
	Order.findByIdAndUpdate(
		{ _id: req.order._id },
		{ $set: { status: "Confirmed" } },
		{ new: true, useFindAndModify: false },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Order Status",
				});
			}
			res.json(order);
		}
	);
};
exports.updateStatusDeclined = (req, res) => {
	Order.findByIdAndUpdate(
		{ _id: req.order._id },
		{ $set: { status: "Declined" } },
		{ new: true, useFindAndModify: false },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Order Status",
				});
			}
			res.json(order);
		}
	);
};
exports.updateStatusCancelled = (req, res) => {
	Order.findByIdAndUpdate(
		{ _id: req.order._id },
		{ $set: { status: "Cancelled" } },
		{ new: true, useFindAndModify: false },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Order Status",
				});
			}
			res.json(order);
		}
	);
};
exports.updatePaymentStatus = (req, res) => {
	Order.findByIdAndUpdate(
		{ _id: req.order._id },
		{ $set: { paid: true } },
		{ new: true, useFindAndModify: false },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Payment Status",
				});
			}
			res.json(order);
		}
	);
};

exports.updateRefundStatus = (req, res) => {
	Order.findByIdAndUpdate(
		{ _id: req.order._id },
		{ $set: { refundApproval: true } },
		{ new: true, useFindAndModify: false },
		(err, order) => {
			if (err) {
				return res.status(400).json({
					error: "Cannot update Refund Status",
				});
			}
			res.json(order);
		}
	);
};
