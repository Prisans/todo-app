const express = require("express")
const connectDB = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors")
const PORT = 8080

const app = express()

connectDB()
app.use(cors())

app.use(express.urlencoded({extended : true}))

app.use(express.json())

app.use("/api/todos",todoRoutes)

app.get("/",(req,res)=>{
    res.send("server running")
})


app.listen(PORT,()=>{
    console.log("server startedd")
})