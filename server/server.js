const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const connectDB = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors")
const PORT = process.env.PORT || 8080

const app = express()

connectDB()

const allowedOrigins = [
    "http://localhost:5173",
    "https://todo-app-ten-kappa-35.vercel.app"
  ]

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET","POST","PUT","DELETE","PATCH"],
    credentials: true
  }))

app.use(express.urlencoded({extended : true}))

app.use(express.json())

app.use("/api/todos",todoRoutes)

app.get("/",(req,res)=>{
    res.send("server running")
})


app.listen(PORT,()=>{
    console.log("server startedd")
})