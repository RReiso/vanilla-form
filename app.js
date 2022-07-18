const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const submitButton = document.querySelector("#submit");
const newsletter = document.querySelector("#newsletter");
const email = document.querySelector("#email");

for (const input of [firstName, lastName]) {
  input.addEventListener("keyup", () =>
    countChars(firstName.value.length, lastName.value.length)
  );
}

const countChars = (firstNameLength, lastNameLength) => {
  if (firstNameLength >= 1 && lastNameLength >= 1) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
};

newsletter.addEventListener("click", () => {
  if (newsletter.checked) {
    email.style.display = "block";
  } else {
    email.style.display = "none";
  }
});
