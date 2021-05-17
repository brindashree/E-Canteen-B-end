const express = require("express");
const router = express.Router();

const { getUserById, getUser,getAllUsers, updateUser, userPurchaseList } = require("../controllers/user");
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");

router.param("userId", getUserById);
router.get("/users/:userId", isSignedIn,isAuthenticated,isAdmin, getAllUsers);
router.get("/user/:userId",isSignedIn,isAuthenticated, getUser);
router.put("/user/:userId",isSignedIn,isAuthenticated,isAdmin, updateUser);
router.put("/user/:userId",isSignedIn,isAuthenticated, userPurchaseList);

module.exports = router;