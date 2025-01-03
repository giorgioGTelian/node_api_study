const express = require("express");
const {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  addReview,
  deleteReview,
} = require("../controllers/booksController");

const router = express.Router();

router.get("/", async (req, res) => res.json(await getBooks()));

router.get("/isbn/:isbn", async (req, res) => {
  try {
    const book = await getBookByISBN(req.params.isbn);
    res.json(book || { error: "Book not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/author/:author", async (req, res) => {
  try {
    const books = await getBooksByAuthor(req.params.author);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/title/:title", async (req, res) => {
  try {
    const books = await getBooksByTitle(req.params.title);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/review/:isbn", async (req, res) => {
  try {
    const { user, review } = req.body;
    const updatedBook = await addReview(req.params.isbn, user, review);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/review/:isbn", async (req, res) => {
  try {
    const { user } = req.body;
    const updatedBook = await deleteReview(req.params.isbn, user);
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
