const {User} = require("../modals/userModal.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const accessTokenTime = 60 * 60 * 1000;
// 
const createToken = (id) => {
  // 
  const accessToken = jwt.sign({ id: id },`${process.env.JWT_TOKEN}`, {
    expiresIn: `${accessTokenTime}ms`,
  });
  return { accessToken };

};

const createUser = async(req,res) => {
  const {email,password} = req.body

  let passwordToString = password.toString();
  let hashPassword = await bcrypt.hash(passwordToString, 10);
  try {
    const checkUser = await User.find({email: email})
  
    if(checkUser.length === 0){
      const user = await User.create({email:email,password:hashPassword,session_id : null})

      res.json({msg : "Signed In" ,user : user,created : true})

    }else{
      res.json({ msg: "Email Already Registered",created: false,})
    }

  } catch (error) {
      console.log(error)
  }

}

const loginUser = async(req,res) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.find({email:email})
  
  if(userExists.length === 0){
    return res.json({ msg: "Invalid Email", status: false });
  }
      if ((password && userExists[0])) {
        if (bcrypt.compareSync(password, userExists[0].password)) {
          const token = createToken(userExists[0]._id);
          // console.log(token.accessToken)
          
        const updated =  await User.findOneAndUpdate({_id : userExists[0]._id},{
         $set:{ token : token.accessToken},
       },
       { returnOriginal: false })
          
         return res.cookie("token",token.accessToken, {
                      withCredentials: true,
                      httpOnly: true,
                      secure : true,
                    }).status(201).send({status: true, user:updated,msg : "Logged in successfully"})
  
        }else{
          return res.json({ msg: "Invalid Password", status: false });
        }
      }
  } catch (error) {
       res.json({err : err.message, status: false });
  }

}

const findUser = async(req,res) => {
  const {id} = req.body
  try {
    const user = await User.find({_id : id})

   return res.json({msg : user})
  } catch (error) {
    return res.json({msg : "Something went wrong please try again"})
  }
  
}

const checkUser = (req, res, next) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if(token !== undefined){
    if (token === undefined || token === null) return res.status(400).json({ error: "token null" });
    try {
        const decoded =  jwt.verify(token,`${process.env.JWT_TOKEN}`)
        req.user = decoded
        next()
    } catch (error) {
      console.log(error)
     return res.status(400).json({msg : "Something went wrong. Please login and try again.",status :false})
    }
  }
};

module.exports = {createUser,loginUser,checkUser,findUser}