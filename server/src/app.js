const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const logger = require("./utils/logger");
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// HTTP Request Logging
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(mongoSanitize()); // Data sanitization against NoSQL query injection

// Rate Limiting
const limiter = rateLimit({
  max: 100, // Limit each IP to 100 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// Standard Middlewares
app.use(cookieParser());
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
}));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Base route
app.get("/", (req, res) => {
    res.send("server running");
});

// Diagnostic route
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok", message: "API is reachable" });
});

// 404 Handler
app.use((req, res, next) => {
  logger.warn(`404 - Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ 
    success: false, 
    message: `Route ${req.originalUrl} not found` 
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error("Global Error Handler: %o", err);
  res.status(err.status || 500).json({ 
    success: false, 
    error: err.message || "Internal Server Error" 
  });
});

module.exports = app;
