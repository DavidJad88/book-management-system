import PrintedBook from "./printedBooks";
import AudioBook from "./audioBook";

class BookManager {
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
    console.log(book);
  }
}

export default BookManager;
