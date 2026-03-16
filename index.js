const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect.js");
const Book = require("./models/books.models.js");

app.use(cors());
app.use(express.json());

initializeDatabase();

//Create or add new Book.
async function createBook(newBook) {
  try {
    const book = new Book(newBook);
    const saveBook = await book.save();
    console.log("Successfully added the book data", saveBook);
  } catch (error) {
    console.log(error);
  }
}

app.post("/books", async (req, res) => {
  try {
    const saveBook = await createBook(req.body);
    res
      .status(201)
      .json({ message: "Book added successfully", book: saveBook });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book." });
  }
});

//fetch all books.
async function getAllBooks() {
  try {
    const viewBooks = await Book.find();
    return viewBooks;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books", async (req, res) => {
  try {
    const allBooks = await getAllBooks();
    if (allBooks != 0) {
      res.json(allBooks);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

//Fetch books with title.
async function getBooksByTitle(byTitle) {
  try {
    const booksByTitle = await Book.findOne({ title: byTitle });
    return booksByTitle;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/:bookTitle", async (req, res) => {
  try {
    const booksByTitle = await getBooksByTitle(req.params.bookTitle);
    if (booksByTitle) {
      res.json(booksByTitle);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

//Fetch Books by author.
async function getBooksByAuthor(byAuthor) {
  try {
    const booksByAuthor = await Book.findOne({ author: byAuthor });
    return booksByAuthor;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/author/:authorName", async (req, res) => {
  try {
    const bookByAuthor = await getBooksByAuthor(req.params.authorName);
    if (bookByAuthor) {
      res.json(bookByAuthor);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

//Fetch books with business genre.
async function getBooksByGenre(ByGenre) {
  try {
    const bookByGenre = await Book.find({ genre: ByGenre });
    return bookByGenre;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/genre/:bookGenre", async (req, res) => {
  try {
    const bookByGenre = await getBooksByGenre(req.params.bookGenre);
    if (bookByGenre) {
      res.json(bookByGenre);
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch book." });
  }
});

//Fetch book with releaseYear.
async function bookByReleaseYear(byReleaseYear) {
  try {
    const bookByRelease = await Book.find({ publishedYear: byReleaseYear });
    return bookByRelease;
  } catch (error) {
    console.log(error);
  }
}

app.get("/books/published/:publishedYear", async (req, res) => {
  try {
    const bookByReleasedYear = await bookByReleaseYear(
      req.params.publishedYear,
    );
    if (bookByReleasedYear) {
      res.json(bookByReleasedYear);
    } else {
      res.status(404).json({ error: "Books not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books." });
  }
});

//Update book rating with Id.
async function updateRatingWithId(bookId, dataToUpdate) {
  try {
    const bookUpdate = await Book.findByIdAndUpdate(bookId, dataToUpdate, {
      new: true,
    });
    return bookUpdate;
  } catch (error) {
    console.log(error);
  }
}

app.post("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await updateRatingWithId(req.params.bookId, req.body);
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book does not exists." });
    }
  } catch (error) {
    res.status(500).json({ error: "Falied to update book." });
  }
});

//update book rating with title.
async function updateBookWithTitle(bookTitle, dataToUpdate) {
  try {
    const bookRating = await Book.findOneAndUpdate(
      { title: bookTitle },
      dataToUpdate,
      {
        new: true,
      },
    );
    return bookRating;
  } catch (error) {
    console.log(error);
  }
}

app.post("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await updateBookWithTitle(
      req.params.bookTitle,
      req.body,
    );
    if (updatedBook) {
      res.status(200).json({
        message: "Book updated successfully",
        updatedBook: updatedBook,
      });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update book." });
  }
});

//Delete Book with Id.
async function deleteBookWithId(bookId) {
  try {
    const deleteBook = await Book.findByIdAndDelete(bookId);
    return deleteBook;
  } catch (error) {
    console.log(error);
  }
}

app.delete("/books/:bookId", async (req, res) => {
  try {
    const deleteBook = await deleteBookWithId(req.params.bookId);
    if (deleteBook) {
      res.status(200).json({ message: "Book deleted successfully." });
    } else {
      res.status(404).json({ error: "Book not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete book." });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log("Server is listening", PORT);
});
