const express = require("express");
const cors = require("cors");

const { initializeDatabase } = require("./database/database");

const bookmarkRoutes = require("./routes/bookmarks");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/bookmarks", bookmarkRoutes);

app.get("/", (req, res) => {
  res.send("Media Library API is running!");
});

const PORT = 3000;

async function startServer() {
  try {
    console.log("Initializing database...");

    await initializeDatabase();

    console.log("Starting server...");


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
  } catch (err) {
    console.error("Error starting server:");
    console.error(err);
  }
}

startServer();
