const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const {
	getUserById,

	pushOrderInPurchaseList,
	getRbUserById,
} = require("../controllers/user");
const { updateStock } = require("../controllers/product");
const {
	createOrder,
	getAllOrders,

	getOrderById,
	getOrderStatus,
	updateStatus,
	updateStatusDeclined,
	updateStatusConfirm,
} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);
router.param("rbuserId", getRbUserById);

//create routes
router.post(
	"/order/create/:userId",
	isSignedIn,
	isAuthenticated,
	pushOrderInPurchaseList,
	createOrder
);

//read routes
router.get(
	"/order/admin/all/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getAllOrders
);
//to read order of specific user
router.get(
	"/order/user/all/:userId",
	isSignedIn,
	isAuthenticated,
	getAllOrders
);
//status of order
router.get(
	"/order/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	getOrderStatus
);
router.put(
	"/order/:orderId/status/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateStatus
);

router.put(
	"/order/:orderId/status/confirm/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateStatusConfirm
);
router.put(
	"/order/:orderId/status/decline/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updateStatusDeclined
);
module.exports = router;
