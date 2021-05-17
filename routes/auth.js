const express = require('express');
var router = express.Router();
const { signout, signup, signin , isSignedIn } = require("../controllers/auth")
const { check , validationResult } = require("express-validator");

router.post("/signup", [
    check("name", "name should be atleast 4 char").isLength({ min: 4 }),
    check("email", "email is required").isEmail(),
    check("password","password should be atleast 6 char").isLength({min:6})
]
    , signup);

router.post("/signin", [
    
    check("email", "email is required").isEmail(),
    check("password","password is required").isLength({min:6})
]
    , signin);

router.get("/signout", signout);



module.exports = router;