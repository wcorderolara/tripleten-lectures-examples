require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT ||3005;
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const todoService = require("./services/todoService");
const connectDB = require("./config/database");
const logger = require("./utils/logger");

// PARSER
app.use(express.json());
// ROUTES
app.get('/api', asyncHandler((req, res) => {
    sendSuccess(res, {
        messsage: 'Welcome to the TODO API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get All Todos',
            'GET /api/todos/:id': 'Get Todo by Id'
        }
    })
}))
app.use("/api/todos", todoRoutes);
app.use("/api/users", userRoutes);
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal Server Error", success: false });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found", success: false });
});

async function startServer() {
  // await todoService.initialize();
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

startServer();
