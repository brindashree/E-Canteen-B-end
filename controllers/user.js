const User = require("../models/User");
const Order = require("../models/Order");
const formidable = require("formidable");
const _ = require("lodash");
//Middleware
exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "No user was found in DB",
			});
		}
		req.profile = user;
		next();
	});
};

exports.getRbUserById = (req, res, next, id) => {
	User.findById(id).exec((err, rbuser) => {
		if (err) {
			return res.status(200).json({
				error: "User not found in DB",
			});
		}

		req.rbuser = rbuser;
		next();
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;
	return res.json(req.profile);
};
exports.getRbUser = (req, res) => {
	req.rbuser.salt = undefined;
	req.rbuser.encry_password = undefined;
	return res.json(req.rbuser);
};

exports.getAllUsers = (req, res) => {
	User.find().exec((err, users) => {
		if (err || !users) {
			return res.status(400).json({
				error: "No users found",
			});
		}
		res.json(users);
	});
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate(
		{ _id: req.profile._id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, user) => {
			if (err || !user) {
				return res.status(400).json({
					error: "You are not authorized to update",
				});
			}
			user.salt = undefined;
			user.encry_password = undefined;
			res.json(user);
		}
	);
};
exports.updaterbUser = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}

		//updation
		let rbUser = req.rbuser;
		rbUser = _.extend(rbUser, fields);

		//save to the DB
		rbUser.save((err, ruser) => {
			if (err) {
				return res.status(400).json({
					error: "Updation of User into DB failed",
				});
			}
			res.json(ruser);
		});
	});
};

exports.userPurchaseList = (req, res) => {
	Order.find({ user: req.profile._id })
		.populate("user", "_id name")
		.exec((err, order) => {
			if (err) {
				return res.status(400).json({
					error: "No order in this account",
				});
			}
			return res.json(order);
		});
};

exports.pushOrderInPurchaseList = (req, res, next) => {
	let purchases = [];
	req.body.order.products.forEach((item) => {
		purchases.push({
			_id: item._id,
			name: item.name,
			description: item.description,
			category: item.category,
			quantity: item.quantity,
			amount: req.body.order.amount,
			transaction_id: req.body.order.transaction_id,
		});
	});

	// store this in db
	User.findOneAndUpdate(
		{ _id: req.profile._id },
		{ $push: { purchases: purchases } },
		{ new: true },
		(err, purchases) => {
			if (err) {
				return res.status(400).json({
					error: "Unable to save purchase list",
				});
			}
			next();
		}
	);
};

exports.removeUser = (req, res) => {
	const rbuser = req.rbuser;
	console.log(req.rbuser);

	rbuser.remove((err, profile) => {
		if (err) {
			return res.status(200).json({
				error: "failed to delete user in DB",
			});
		}

		res.json({
			message: `User ${profile} deleted successfully`,
		});
	});
};
