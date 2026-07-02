const { getDatabase } = require("../database/database");

// GET all categories
async function getCategories(req, res) {
  try {
    const db = getDatabase();

    const categories = await db.all(
      "SELECT * FROM categories ORDER BY name"
    );

    res.json(categories);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load categories" });
  }
}

// CREATE category
async function createCategory(req, res) {
  try {
    const db = getDatabase();

    const { name } = req.body;

    const result = await db.run(
      "INSERT INTO categories(name) VALUES(?)",
      [name]
    );

    res.status(201).json({
      id: result.lastID,
      name,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create category" });
  }
}

module.exports = {
  getCategories,
  createCategory,
};
