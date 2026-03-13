const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const connectDB = require("./config/db")
const todoRoutes = require("./routes/todoRoutes")
const cors = require("cors")
const PORT = process.env.PORT || 8080

const app = express()

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  console.error("Please add MONGO_URI to your Render environment variables.");
  process.exit(1);
}

// Updated CORS to be more robust
app.use(cors({
    origin: [
      "http://localhost:5173", 
      "https://todo-app-ten-kappa-35.vercel.app",
      "https://todo-app-mziu.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 200
  }))

app.use(express.urlencoded({extended : true}))
app.use(express.json())


app.use("/api/todos",todoRoutes)

// Global error handler to preserve CORS headers on error
app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

app.get("/",(req,res)=>{
    res.send("server running")
})


// Connect to DB and Log
connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
  })
}).catch(err => {
  console.error("Failed to start server due to DB connection error:", err);
})