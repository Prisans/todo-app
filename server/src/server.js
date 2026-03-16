const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8080;

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is not defined.");
  process.exit(1);
}

// Connect to DB and Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to start server due to DB connection error:", err);
});