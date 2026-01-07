const express = require("express");
const app = express();
const PORT = 3005;
const todoRoutes = require("./routes/todoRoutes");
const todoService = require("./services/todoService");

app.use(express.json());
// ROUTES
app.use("/api", todoRoutes);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);
  res.status(500).json({ error: "Internal Server Error", success: false });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found", success: false });
});

async function startServer() {
  await todoService.initialize();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();