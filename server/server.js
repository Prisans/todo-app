const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const connectDB = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors")
const PORT = process.env.PORT || 8080

const app = express()

// Updated CORS to be more robust
app.use(cors({
    origin: ["http://localhost:5173", "https://todo-app-ten-kappa-35.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200
  }))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

// Connect to DB and Log
connectDB();

app.use("/api/todos",todoRoutes)

// Global error handler to preserve CORS headers on error
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

app.get("/",(req,res)=>{
    res.send("server running")
})


app.listen(PORT,()=>{
    console.log("server startedd")
})