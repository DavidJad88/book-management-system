import PrintedBook from "./printedBooks";
import AudioBook from "./audioBook";
import Book from "./book";
import UserInterface from "./userInterface";

class BookManager {
  static booksCollection =
    JSON.parse(localStorage.getItem("books-collection")) || [];
  static addBook(
    title,
    author,
    publisher,
    date,
    bookType,
    pages,
    printType,
    narrator,
    duration
  ) {
    let book;
    if (bookType === "printed-book") {
      book = new PrintedBook(
        title,
        author,
        publisher,
        date,
        bookType,
        pages,
        printType
      );
    } else {
      book = new AudioBook(
        title,
        author,
        publisher,
        date,
        bookType,
        narrator,
        duration
      );
    }
    this.booksCollection.push(book);
    this.storeBooks(this.booksCollection);
    console.log(this.booksCollection);
  }

  static storeBooks(collection) {
    localStorage.setItem("books-collection", JSON.stringify(collection));
  }

  static deleteBook(bookId) {
    BookManager.booksCollection = BookManager.booksCollection.filter((book) => {
      return book.id !== bookId;
    });
    BookManager.storeBooks(BookManager.booksCollection);
    UserInterface.renderBooks();
  }
}

export default BookManager;
