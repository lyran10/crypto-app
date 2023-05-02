const express = require("express")
const router = express.Router()
const {createUser, loginUser,checkUser, findUser} = require("../controllers/userControllers.js")

router.post("/signup",createUser);

router.post("/login",loginUser);

router.post("/expiry",checkUser,findUser);

router.get("/logout", (req, res) => {
 return res.clearCookie("token",{path : "/"}).status(200).json({ status: false, msg :"cleared"});
});




module.exports = router