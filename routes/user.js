const express = require("express");
const router = express.Router();

const {
	getUserById,
	getUser,
	getAllUsers,
	updateUser,
	userPurchaseList,
	removeUser,
	getRbUserById,
	updaterbUser,
	getRbUser,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

router.param("userId", getUserById);
router.param("rbuserId", getRbUserById);
router.get("/user/:rbuserId", getRbUser);
router.get("/users/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUsers);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, isAdmin, updateUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

//update certain user
router.put(
	"/user/:rbuserId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	updaterbUser
);
router.delete(
	"/user/:rbuserId/:userId",
	isSignedIn,
	isAuthenticated,
	isAdmin,
	removeUser
);

module.exports = router;
