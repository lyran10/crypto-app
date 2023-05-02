const {User} = require("../modals/userModal.js")

const addToWatchlist = async(req, res,next) => {
  const {id,coin} = req.body
  try {
    const addCoin = await User.updateOne(
      { _id: id },
      { $push: { watchlist: coin } }
   )
  return res.status(200).json({coin : addCoin, status : true,addedCoin : coin,msg : "Coin added"})
  } catch (error) {
    return res.json({status : false, msg : "Something went wrong try again later",addedCoin : coin})
  }
 
};

const getList = async(req, res) => {
  const {id}  = req.body
  try {
    const data = await User.findById({_id : id})
  return res.status(200).json({list : data})
  } catch (error) {
    console.log(error)
  }
};

const deleteCoin = async(req, res) => {
  const {id,coin} = req.body
  const deleteCoin = await User.updateOne(
    { _id: id },
    { $pull: { watchlist: coin } }
 )

 res.status(200).json({msg : "Coin removed"})
  
};

module.exports = {addToWatchlist,getList,deleteCoin}