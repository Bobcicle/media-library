const express = require("express");
const router = express.Router();

const { getDatabase } = require("../database/database");

router.get("/", async (req, res) => {
  try {
    const db = getDatabase();

    const bookmarks = await db.all(`
      SELECT *
      FROM bookmarks
      ORDER BY createdAt DESC
    `);

    res.json(bookmarks);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Unable to fetch bookmarks",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const db = getDatabase();

    const {
      title,
      url,
      type,
      description,
      thumbnail,
      favorite,
      categoryId,
    } = req.body;

    if (!title || !url || !type) {
      return res.status(400).json({
        error: "title, url and type are required",
      });
    }

    const result = await db.run(
      `
      INSERT INTO bookmarks
      (title, url, type, description, thumbnail, favorite, categoryId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        title,
        url,
        type,
        description || "",
        thumbnail || "",
        favorite ? 1 : 0,
        categoryId || null,
      ]
    );

    const bookmark = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      result.lastID
    );

    res.status(201).json(bookmark);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Unable to create bookmark",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const db = getDatabase();

    const { id } = req.params;

    const {
      title,
      url,
      type,
      description,
      thumbnail,
      favorite,
      categoryId,
    } = req.body;

    const result = await db.run(
      `
      UPDATE bookmarks
      SET
        title = ?,
        url = ?,
        type = ?,
        description = ?,
        thumbnail = ?,
        favorite = ?,
        categoryId = ?
      WHERE id = ?
      `,
      [
        title,
        url,
        type,
        description,
        thumbnail,
        favorite ? 1 : 0,
        categoryId,
        id,
      ]
    );

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Bookmark not found",
      });
    }

    const bookmark = await db.get(
      "SELECT * FROM bookmarks WHERE id = ?",
      id
    );

    res.json(bookmark);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Unable to update bookmark",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {

    const db = getDatabase();

    const result = await db.run(
      "DELETE FROM bookmarks WHERE id = ?",
      req.params.id
    );

    if (result.changes === 0) {
      return res.status(404).json({
        error: "Bookmark not found",
      });
    }

    res.json({
      message: "Bookmark deleted"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Unable to delete bookmark"
    });

  }
});

module.exports = router;

