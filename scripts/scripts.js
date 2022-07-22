const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confPassword = document.getElementById("conf-password");
const confRegisterScreen = document.querySelector(
  ".confirm-register-container"
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

function checkInputs() {
  const usernameValue = username.value;
  const emailValue = email.value;
  const passwordValue = password.value;
  const confPasswordValue = confPassword.value;

  if (usernameValue === "") {
    setErrorFor(username, "O nome de usuário é obrigatório!");
  } else {
    setSuccessFor(username);
  }

  if (emailValue === "") {
    setErrorFor(email, "O email é obrigatório!");
  } else if (!checkEmail(emailValue)) {
    setErrorFor(email, "Insira um email válido!");
  } else {
    setSuccessFor(email);
  }

  if (passwordValue === "") {
    setErrorFor(password, "A senha é obrigatória!");
  } else if (passwordValue.length < 7) {
    setErrorFor(password, "A senha deve conter no mínimo 7 caracteres!");
  } else {
    setSuccessFor(password);
  }

  if (confPasswordValue === "") {
    setErrorFor(confPassword, "Confirme a senha!");
  } else if (confPasswordValue !== passwordValue) {
    setErrorFor(confPassword, "As senhas não conferem!");
  } else {
    setSuccessFor(confPassword);
  }

  const formControls = form.querySelectorAll(".form-control");

  const formIsValid = [...formControls].every((formControl) => {
    return formControl.className === "form-control success";
  });

  if (formIsValid) {
    username.value = "";
    email.value = "";
    password.value = "";
    confPassword.value = "";

    const formControl = document.querySelectorAll(".form-control");

    campCleaner(username);
    campCleaner(email);
    campCleaner(password);
    campCleaner(confPassword);

    confRegisterScreen.classList.add("showConfirmRegister");
  }
}

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");

  //   adiciona a mensagem de erro
  small.innerText = message;

  // adiciona a classe error
  formControl.className = "form-control error";
}

function setSuccessFor(input) {
  const formControl = input.parentElement;

  //   adiciona a classe success
  formControl.className = "form-control success";
}

function campCleaner(input) {
  const formControl = input.parentElement;

  //   adiciona a classe success
  formControl.className = "form-control";
}

function checkEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
