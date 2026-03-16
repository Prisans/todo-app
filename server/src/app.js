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
const userRoutes = require("./routes/userRoutes");

const app = express();

// 1. CORS - MUST BE FIRST
app.use(cors({
    origin: [
      "http://localhost:5173", 
      "https://todo-app-ten-kappa-35.vercel.app",
      "https://todo-app-mziu.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));

// 2. Logging
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));

// 3. Security
app.use(helmet());
app.use(mongoSanitize());

// 4. Rate Limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

// 5. Body Parsing
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// Routes
const apiRouter = express.Router();
apiRouter.use("/auth", authRoutes);
apiRouter.use("/todos", todoRoutes);
apiRouter.use("/users", userRoutes);

app.use("/api", apiRouter);

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
  logger.error("Global Error Handler: %o", {
    message: err.message,
    stack: err.stack,
    status: err.status
  });
  res.status(err.status || 500).json({ 
    success: false, 
    message: err.message || "Internal Server Error" 
  });
});

module.exports = app;
