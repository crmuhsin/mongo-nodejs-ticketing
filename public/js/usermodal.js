var userInfo = "";
function updateNavbar() {
  let nav = document.getElementById("navList");
  if (localStorage.getItem("info")) {
    userInfo = JSON.parse(localStorage.getItem("info"))
  }
  if (userInfo) {
    nav.innerHTML = "";
    if (userInfo.user_type === "admin") {
      nav.innerHTML += `<li class="nav-item"><a href="admin" class="nav-link">Admin Panel</a></li>`;
    }
    nav.innerHTML += `<li class="nav-item"><button class="nav-link" onclick="logout()">Logout</button></li>`;
  } else {
    nav.innerHTML = `
      <li class="nav-item "><button class="nav-link" onclick="openModal('Login')">Login</button></li>
      <li class="nav-item"><button class="nav-link" onclick="openModal('Register')">Register</button></li>
    `;
  }
}
function logout() {
  localStorage.setItem("info", "")
  updateNavbar()
}
function openModal(modalType) {
  let modal = document.getElementById("myModal");
  let modalContent = document.getElementById("modalContent");
  let modalHead = document.getElementById("modalHead");
  modal.style.display = "block";
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  if (modalType === 'Login') {
    modalHead.innerText = "Login";
    modalContent.innerHTML = loginModal();
  } else {
    modalHead.innerText = "Register";
    modalContent.innerHTML = registerModal()
  }
}
function closeModal() {
  let modal = document.getElementById("myModal");
  modal.style.display = "none";
}
function loginModal() {
  return `<div>
    <input class="text-input" type="email" id="email" placeholder="Enter Email">
    <input class="text-input" type="password" id="password" placeholder="Enter Password">
    <button class="btn-form" onclick="login(email, password)">Login</button></td>
  </div>
  <h6>Need An Account? <a class="modal-link" onclick="closeModal();openModal('Register')">Sign Up Now</a></h6>
  `;
}
function registerModal() {
  return `<div>
    <input class="text-input" type="text" id="username" placeholder="Enter Username">
    <input class="text-input" type="email" id="email" placeholder="Enter Email">
    <input class="text-input" type="password" id="password" placeholder="Enter Password">
    <input class="text-input" type="password" id="confirm_password" placeholder="Confirm Password">
    <button class="btn-form" onclick="register(username, email, password, confirm_password)">Register</button>
  </div>
  <h6>Already have an account? <a class="modal-link" onclick="closeModal();openModal('Login')">Login</a></h6>
  `;
}

function login(email, password) {
  let loginJson = {
    email: email.value,
    password: password.value
  }
  fetch("/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginJson),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.message) {
        let modalMsg = document.getElementById("modalMsg");
        modalMsg.innerText = response.message;
        setTimeout(() => { modalMsg.innerText = ""; }, 3000);
      } else {
        localStorage.setItem("info", JSON.stringify(response))
        closeModal()
        updateNavbar()
      }
    })
}
function register(username, email, password, confirm_password) {
  if (password.value !== confirm_password.value) {
    let modalMsg = document.getElementById("modalMsg");
    modalMsg.innerText = "Passwords didn't match";
    setTimeout(() => { modalMsg.innerText = ""; }, 3000);
    return;
  }
  let registerJson = {
    username: username.value,
    email: email.value,
    password: password.value,
    user_type: "user"
  }
  fetch("/register-user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerJson),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.message) {
        let modalMsg = document.getElementById("modalMsg");
        modalMsg.innerText = response.message;
        setTimeout(() => { modalMsg.innerText = ""; }, 3000);
      } else {
        localStorage.setItem("info", JSON.stringify(response))
        closeModal()
        updateNavbar()
      }
    })
}
updateNavbar()