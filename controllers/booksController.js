const books = require("../data/books");

exports.getBooks = async () => books;

exports.getBookByISBN = async (isbn) => books.find((book) => book.isbn === isbn);

exports.getBooksByAuthor = async (author) =>
  books.filter((book) => book.author.toLowerCase() === author.toLowerCase());

exports.getBooksByTitle = async (title) =>
  books.filter((book) => book.title.toLowerCase().includes(title.toLowerCase()));

exports.addReview = async (isbn, user, review) => {
  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    book.reviews.push({ user, review });
    return book;
  }
  throw new Error("Book not found");
};

exports.deleteReview = async (isbn, user) => {
  const book = books.find((b) => b.isbn === isbn);
  if (book) {
    book.reviews = book.reviews.filter((rev) => rev.user !== user);
    return book;
  }
  throw new Error("Book not found");
};
