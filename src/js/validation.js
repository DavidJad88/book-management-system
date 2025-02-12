class Validation {
  static validateForm(bookType, validationMessage) {
    validationMessage.style.display = "none";
    const fieldsToValidate = [
      { name: "title", message: "Please enter the book title" },
      { name: "author", message: "Please enter authors name" },
      { name: "publisher", message: "Please enter the publishers name" },
      { name: "publication-date", message: "Please enter publication date" },
      { name: "book-type", message: "Please enter type of the book" },
    ];

    if (bookType === "printed-book") {
      fieldsToValidate.push(
        { name: "pages", message: "Please enter number of pages" },
        { name: "print-type", message: "Please enter the print type" }
      );
    } else if (bookType === "audio-book") {
      fieldsToValidate.push(
        { name: "narrator", message: "Please enter the narrator" },
        { name: "duration", message: "Please enter the pduaration" }
      );
    }
    for (let field of fieldsToValidate) {
      const inputField = document.querySelector(`[id=${field.name}]`);
      inputField.classList.remove("form__invalid-input");
      inputField.addEventListener("input", () => {
        inputField.classList.remove("form__invalid-input");
        validationMessage.textContent = "";
      });
      if (!inputField.value.trim()) {
        validationMessage.style.display = "block";
        validationMessage.textContent = field.message;
        inputField.classList.add("form__invalid-input");
        return false;
      }
    }
    return true;
  }
}
export default Validation;
