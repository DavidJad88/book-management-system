import BookManager from "./bookManager";
import UserInterface from "./userInterface";

// SELECTING DOM ELEMENTS

const openAddModalButton = document.querySelector(".add-books__button");
const closeAddModalButton = document.querySelector(".form__cancel-button");
const formModal = document.querySelector(".form-modal");
const printedBookContainer = document.querySelector(".form__printed-book");
const audioBookContainer = document.querySelector(".form__audio-book");

// SELECTING FORM INPUTS

const form = document.querySelector(".form");
const title = document.querySelector(".form__title-input");
const author = document.querySelector(".form__author-input");
const publisher = document.querySelector(".form__publisher-input");
const date = document.querySelector(".form__publication-date-input");
const bookTypeDropdown = document.querySelector(".form__book-type");

const filterContainer = document.querySelector(".filter-books");
const formSubmitButton = document.querySelector(".form__add-button");

// SELECTING ELEMENTS SPECIFIC TO PRINTED BOOKS

const pages = document.querySelector(".form__pages-input");
const printType = document.querySelector(".form__print-type");

// SELECTING ELEMENTS SPECIFIC TO AUDIO BOOKS

const narrator = document.querySelector(".form__narrator-input");
const duration = document.querySelector(".form__duration-input");

// ALL ELEMENTS IN PRINTED AND AUDIO CATEGPORY

const printedFields = [
  document.querySelector(".form__pages-input"),
  document.querySelector(".form__print-type"),
];

const audioFields = [
  document.querySelector(".form__narrator-input"),
  document.querySelector(".form__duration-input"),
];

// ADDING EVENT LISTENERS

document.addEventListener("DOMContentLoaded", () => {
  UserInterface.displayAddModal(
    openAddModalButton,
    formModal,
    printedBookContainer,
    audioBookContainer
  );
  UserInterface.closeAddModal(closeAddModalButton, formModal);
});

bookTypeDropdown.addEventListener("change", () => {
  UserInterface.toggleBookTypeFields(
    printedBookContainer,
    audioBookContainer,
    audioFields,
    printedFields,
    bookTypeDropdown.value
  );
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  BookManager.addBook(
    title.value.trim(),
    author.value.trim(),
    publisher.value.trim(),
    date.value,
    bookTypeDropdown.value,
    pages.value.trim(),
    printType.value,
    narrator.value.trim(),
    duration.value
  );
});
