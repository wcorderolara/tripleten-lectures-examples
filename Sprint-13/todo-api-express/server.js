require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT ||3005;
const todoRoutes = require("./routes/todoRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const listRoutes = require("./routes/todoListRouter");
const connectDB = require("./config/database");
const logger = require("./utils/logger");

// PARSER
app.use(cors());
app.use(express.json());
// ROUTES
app.get('/api', (req, res) => {
    sendSuccess(res, {
        messsage: 'Welcome to the TODO API',
        version: '1.0.0',
        endpoints: {
            'GET /api/todos': 'Get All Todos',
            'GET /api/todos/:id': 'Get Todo by Id'
        }
    })
})
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/lists/:listId/todos", todoRoutes);

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
