const Category = require("../models/Category");
const Product = require("../models/Product");
const formidable = require("formidable");
const _ = require("lodash");

exports.getCategoryById = (req, res, next, id) => {
	Category.findById(id).exec((err, cate) => {
		if (err) {
			return res.status(200).json({
				error: "Category not found in DB",
			});
		}

		req.category = cate;
		next();
	});
};

exports.createCategory = (req, res) => {
	const category = new Category(req.body);
	category.save((err, category) => {
		if (err) {
			return res.status(200).json({
				error: "nOT ABLE TO SAVE CATEGORY in DB",
			});
		}
		res.json({ category });
	});
};

exports.getCategory = (req, res) => {
	return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
	Category.find().exec((err, categories) => {
		if (err) {
			return res.status(200).json({
				error: "nO CATEGORY in DB",
			});
		}

		res.json(categories);
	});
};

// exports.updateCategory = (req, res) => {
// 	const category = req.category;
// 	category.name = req.body.name;

// 	category.save((err, updatedCategory) => {
// 		if (err) {
// 			return res.status(200).json({
// 				error: "failed to update CATEGORY in DB",
// 			});
// 		}
// 		res.json(updatedCategory);
// 	});
// };

exports.updateCategory = (req, res) => {
	let form = new formidable.IncomingForm();
	form.keepExtensions = true;

	form.parse(req, (err, fields) => {
		if (err) {
			return res.status(400).json({
				error: "problem with image",
			});
		}

		//updation
		let category = req.category;
		category = _.extend(category, fields);

		//save to the DB
		category.save((err, category) => {
			if (err) {
				return res.status(400).json({
					error: "Updation of category into DB failed",
				});
			}
			res.json(category);
		});
	});
};

exports.removeCategory = (req, res) => {
	const categoryyy = req.category;

	categoryyy.remove((err, category) => {
		if (err) {
			return res.status(200).json({
				error: "failed to delete CATEGORY in DB",
			});
		}

		res.json({
			message: `Category ${category} deleted successfully`,
		});
	});
};
