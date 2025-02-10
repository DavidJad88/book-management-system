class UserInterface {
  static toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookType
  ) {
    // HIDE BOTH CONTAINERS INIT
    printedBookContainer.style.display = "none";
    audioBookContainer.style.display = "none";
    // RESET OF VALUES
    printedFields.forEach((field) => (field.value = ""));
    audioFields.forEach((field) => (field.value = ""));

    // DISPLAYING RELEVANT CONTAINER ON SELECTION
    if (bookType === "printed-book") {
      printedBookContainer.style.display = "block";
    } else {
      audioBookContainer.style.display = "block";
    }
  }

  static displayAddModal(
    openAddModalButton,
    formModal,
    printedBookContainer,
    audioBookContainer
  ) {
    openAddModalButton.addEventListener("click", () => {
      formModal.classList.add("display-form");
      // RESTORE DEFAULT FORM
      printedBookContainer.style.display = "none";
      audioBookContainer.style.display = "none";
    });
  }

  static closeAddModal(closeAddModalButton, formModal) {
    closeAddModalButton.addEventListener("click", () => {
      formModal.classList.remove("display-form");
    });
  }

  static renderBooks() {
    const bookList = document.querySelector(".books__list");
    bookList.innerHTML = "";
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );
    booksCollection.forEach((book, index, arr) => {
      const bookCard = document.createElement("li");
      //main card containers
      const bookDetailsContainer = document.createElement("div");
      const bookToolsContainer = document.createElement("div");
      //details containers
      const titleContainer = document.createElement("div");
      const authorContainer = document.createElement("div");
      const publisherContainer = document.createElement("div");
      const dateContainer = document.createElement("div");
      const bookTypeContainer = document.createElement("div");

      const pagesOrNarratorContainer = document.createElement("div");
      const printTypeOrDurationContainer = document.createElement("div");
      //heading
      const titleHeader = document.createElement("h3");
      const authorHeader = document.createElement("h3");
      const publisherHeader = document.createElement("h3");
      const dateHeader = document.createElement("h3");
      const bookTypeHeader = document.createElement("h3");

      const pagesOrNarratorHeader = document.createElement("h3");
      const printTypeOrDurationHeader = document.createElement("h3");
      //value
      const title = document.createElement("span");
      const author = document.createElement("span");
      const publisher = document.createElement("span");
      const date = document.createElement("span");
      const bookType = document.createElement("span");

      const pagesOrNarrator = document.createElement("span");
      const printTypeOrDuration = document.createElement("span");
      //buttons
      const deleteButton = document.createElement("button");
      const editButton = document.createElement("button");

      //appending
      bookList.append(bookCard);
      bookCard.append(bookDetailsContainer, bookToolsContainer);
      bookDetailsContainer.append(
        titleContainer,
        authorContainer,
        publisherContainer,
        dateContainer,
        bookTypeContainer,
        pagesOrNarratorContainer,
        printTypeOrDurationContainer
      );

      titleContainer.append(titleHeader, title);
      authorContainer.append(authorHeader, author);
      publisherContainer.append(publisherHeader, publisher);
      dateContainer.append(dateHeader, date);
      bookTypeContainer.append(bookTypeHeader, bookType);
      pagesOrNarratorContainer.append(pagesOrNarratorHeader, pagesOrNarrator);
      printTypeOrDurationContainer.append(
        printTypeOrDurationHeader,
        printTypeOrDuration
      );

      bookToolsContainer.append(deleteButton, editButton);

      //populating the book card with books details
      titleHeader.textContent = "Title ";
      authorHeader.textContent = "Author ";
      publisherHeader.textContent = "Publisher ";
      dateHeader.textContent = "Published ";
      bookTypeHeader.textContent = "Book Type ";

      pagesOrNarratorHeader.textContent =
        book.bookType === "printed-book" ? "Pages " : "Narrator ";
      printTypeOrDurationHeader.textContent =
        book.bookType === "printed-book" ? "Print Type " : "Duration ";

      title.textContent = book.title;
      author.textContent = book.author;
      publisher.textContent = book.publisher;
      date.textContent = book.date;
      bookType.textContent = book.bookType;
      pagesOrNarrator.textContent =
        book.bookType === "printed-book" ? book.pages : book.narrator;
      printTypeOrDuration.textContent =
        book.bookType === "printed-book" ? book.printType : book.duration;

      deleteButton.textContent = "Delete";
      editButton.textContent = "edit";
      //add class names
      bookCard.classList.add("book__item");
      bookDetailsContainer.classList.add("book-item__details-container");
      bookToolsContainer.classList.add("book-item__tools-container");
      deleteButton.classList.add("book-item__delete-button");
      editButton.classList.add("book-item__edit-button");
    });
  }
}

export default UserInterface;
