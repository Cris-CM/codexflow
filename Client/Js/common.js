function updateUserName() {
  const userName = localStorage.getItem("userName");
  if (userName) {
    const userNameElements = document.querySelectorAll(".user-name");
    userNameElements.forEach((element) => {
      element.textContent = userName;
    });
  }
}

document.addEventListener("DOMContentLoaded", updateUserName);
