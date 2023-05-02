const express = require("express")
const {connectDB} = require("./connection/connection.js")
const app = express()
const userRouter = require("./routes/userRoutes.js")
const watchlistRouter = require("./routes/watchlistRoutes.js")
const dotenv = require("dotenv")
const cors = require("cors")
const cookieParser = require("cookie-parser")

dotenv.config()

connectDB()

app.use(cors({ origin:["http://localhost:3000/","https://crypto-app-inf1.onrender.com"], credentials: true }));
app.use(express.json());
app.use("/api", userRouter);
app.use("/api", watchlistRouter);
app.use(cookieParser());

app.listen(process.env.PORT,() => {
  console.log(`running on ${process.env.PORT}`)
})