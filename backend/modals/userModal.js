const mongoose = require("mongoose")

const UserModal = mongoose.Schema({
  email : String,
  password : String,
  token : String,
  
  watchlist : []
})


const User = mongoose.model("User",UserModal)

module.exports = {User}