const body = document.querySelector("body");
const form = document.querySelector("#form");
const firstName = document.querySelector("#first-name");
const lastName = document.querySelector("#last-name");
const comment = document.querySelector("#comment");
const newsletter = document.querySelector("#newsletter");
const email = document.querySelector("#email");
const submitButton = document.querySelector("#submit");

form.addEventListener("submit", (event) =>
  postData(event, firstName, lastName, comment, newsletter.checked, email)
);

// Listen for text inputs
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

// Listen if checkbox is clicked
newsletter.addEventListener("click", () => {
  if (newsletter.checked) {
    email.style.display = "block";
    email.required = true;
  } else {
    email.style.display = "none";
    email.required = false;
  }
});

const postData = async (
  event,
  firstName,
  lastName,
  comment,
  isSubscribed,
  email
) => {
  event.preventDefault();
  submitButton.disabled = true;

  try {
    const data = {
      firstName: firstName.value,
      lastName: lastName.value,
      isSubscribed,
      email: email.value,
      comment: comment.value,
    };
    if (!isSubscribed) {
      delete data.email;
    }

    // post data
    await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const p = document.createElement("p");
    p.innerHTML = `Thanks for your submission ${firstName.value}!`;
    body.appendChild(p);

    //reset values
    firstName.value = "";
    lastName.value = "";
    comment.value = "";
    email.value = "";

    // hide message
    setTimeout(() => {
      p.style.display = "none";
    }, 2000);
  } catch (error) {
    // show error message
    const p = document.createElement("p");
    p.innerHTML = "Oops something went wrong!";
    body.appendChild(p);
  }
};
