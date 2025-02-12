import BookManager from "./bookManager";
class Ui {
  static currentEditId = null;
  static toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookType
  ) {
    // HIDE BOTH CONTAINERS INITIALLY
    printedBookContainer.style.display = "none";
    audioBookContainer.style.display = "none";
    // RESET THE VALUES OF BOTH CATEGORIES
    printedFields.forEach((field) => (field.value = ""));
    audioFields.forEach((field) => (field.value = ""));
    // DISPLAY THE RELEVANT CONTAINER BASED ON USER'S SELECTION
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
      // HIDE BOTH CONTAINERS INITIALLY
      printedBookContainer.style.display = "none";
      audioBookContainer.style.display = "none";
    });
  }
  static closeAddModal(closeAddModalButton, formModal) {
    closeAddModalButton.addEventListener("click", () => {
      formModal.classList.remove("display-form");
    });
  }

  static displayDeleteModal(bookId, bookTitle) {
    const deleteModal = document.querySelector(".delete-modal");
    const deleteMessage = document.querySelector(".delete-modal__text");
    const confirmDeleteButton = document.querySelector(
      ".delete-modal__confirm-button"
    );
    deleteMessage.textContent = `Are you sure you want to delete ${bookTitle}`;
    deleteModal.classList.add("display-modal");
    confirmDeleteButton.addEventListener("click", () => {
      BookManager.deleteBook(bookId);
      deleteModal.classList.remove("display-modal");
    });
  }

  static closeDeleteModal() {
    const deleteModal = document.querySelector(".delete-modal");
    const cancelDeleteButton = document.querySelector(
      ".delete-modal__cancel-button"
    );
    cancelDeleteButton.addEventListener("click", () => {
      deleteModal.classList.remove("display-modal");
    });
  }

  static displayEditModal() {
    const formModal = document.querySelector(".form-modal");
    const formSubmitButton = document.querySelector(".form__add-button");
    formModal.classList.add("display-form");
    formSubmitButton.textContent = "Confirm Edit";
  }
  static populateEditForm(id) {
    const title = document.querySelector(".form__title-input");
    const author = document.querySelector(".form__author-input");
    const publisher = document.querySelector(".form__publisher-input");
    const date = document.querySelector(".form__publication-input");
    const bookTypeDropdown = document.querySelector(".form__book-type");
    const printedBookContainer = document.querySelector(".form__printed-book");
    const audioBookContainer = document.querySelector(".form__audio-book");
    const pages = document.querySelector(".form__pages-input");
    const printType = document.querySelector(".form__print-type");

    const narrator = document.querySelector(".form__narrator-input");
    const duration = document.querySelector(".form__duration-input");
    // -----Fixed
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );

    const bookToEdit = booksCollection.find((book) => book.id === id);
    // ------
    title.value = bookToEdit.title;
    author.value = bookToEdit.author;
    publisher.value = bookToEdit.publisher;
    date.value = bookToEdit.date;
    bookTypeDropdown.value = bookToEdit.bookType;

    if (bookToEdit.bookType === "printed-book") {
      audioBookContainer.style.display = "none";
      printedBookContainer.style.display = "block";
      pages.value = bookToEdit.pages;
      printType.value = bookToEdit.printType;
    } else {
      printedBookContainer.style.display = "none";
      audioBookContainer.style.display = "block";
      narrator.value = bookToEdit.narrator;
      duration.value = bookToEdit.duration;
    }
    Ui.currentEditId = id;
  }

  static renderBooks(filter = "all") {
    const bookList = document.querySelector(".books__list");
    bookList.innerHTML = "";
    const booksCollection = JSON.parse(
      localStorage.getItem("books-collection")
    );

    const filteredCollection =
      filter === "all"
        ? booksCollection
        : booksCollection.filter((book) => book.bookType === filter);

    if (filteredCollection) {
      filteredCollection.forEach((book, index, arr) => {
        const bookCard = document.createElement("li");
        const bookDetailsContainer = document.createElement("div");
        const bookToolsContainer = document.createElement("div");

        const titleContainer = document.createElement("div");
        const authorContainer = document.createElement("div");
        const publisherContainer = document.createElement("div");
        const dateContainer = document.createElement("div");
        const bookTypeContainer = document.createElement("div");
        const pagesOrNarratorContainer = document.createElement("div");
        const printTypeOrDurationContainer = document.createElement("div");

        const titleHeader = document.createElement("h3");
        const authorHeader = document.createElement("h3");
        const publisherHeader = document.createElement("h3");
        const dateHeader = document.createElement("h3");
        const bookTypeHeader = document.createElement("h3");
        const pagesOrNarratorHeader = document.createElement("h3");
        const printTypeOrDurationHeader = document.createElement("h3");

        const title = document.createElement("span");
        const author = document.createElement("span");
        const publisher = document.createElement("span");
        const date = document.createElement("span");
        const bookType = document.createElement("span");
        const pagesOrNarrator = document.createElement("span");
        const printTypeOrDuration = document.createElement("span");

        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");

        //  Appending elements
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
        // Populating the book card with book's details

        titleHeader.textContent = "Title: ";
        authorHeader.textContent = "Author: ";
        publisherHeader.textContent = "Publisher: ";
        dateHeader.textContent = "Release Date: ";
        bookTypeHeader.textContent = "Book type: ";
        pagesOrNarratorHeader.textContent =
          book.bookType === "printed-book" ? "Pages: " : "Narrator: ";
        printTypeOrDurationHeader.textContent =
          book.bookType === "printed-book" ? "Print type: " : "Duration: ";

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
        editButton.textContent = "Edit";

        // Add class names
        bookCard.classList.add("book__item");
        bookDetailsContainer.classList.add("book-item__details-container");
        bookToolsContainer.classList.add("book-item__tools-container");
        deleteButton.classList.add("book-item__delete-button");
        editButton.classList.add("book-item__edit-button");

        // Add event listeners to the buttons
        deleteButton.addEventListener("click", () => {
          Ui.displayDeleteModal(book.id, book.title);
        });
        editButton.addEventListener("click", () => {
          Ui.displayEditModal();
          Ui.populateEditForm(book.id);
        });
      });
    }
  }
}

export default Ui;
