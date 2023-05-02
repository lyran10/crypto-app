const express = require("express")
const router = express.Router()
const {addToWatchlist,getList,deleteCoin} = require("../controllers/watchlistControllers.js")
const {checkUser} = require("../controllers/userControllers.js")


router.post("/addcoin",checkUser, addToWatchlist);

router.post("/list",checkUser,getList);

router.post("/deletecoin",checkUser, deleteCoin);


module.exports = router