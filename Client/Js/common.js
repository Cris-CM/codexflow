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

function showSection(sectionId) {
  // Ocultar todas las secciones
  document.getElementById('reseñas').style.display = 'none';
  document.getElementById('instructores').style.display = 'none';
  
  // Mostrar la sección seleccionada
  document.getElementById(sectionId).style.display = 'block';
}