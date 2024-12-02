document.addEventListener("DOMContentLoaded", () => {
  const downloadButton = document.getElementById("downloadCertificate");

  downloadButton.addEventListener("click", () => {
    // Simulate PDF download (replace with actual PDF generation/download logic)
    const pdfUrl = "/Certificados/fdp_python.pdf";

    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Certificado de Fundamentos de programacion de Python.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(() =>
        alert(
          "Error al descargar el certificado. Por favor, inténtalo de nuevo más tarde."
        )
      );
  });

  // Create confetti effect
  const confettiContainer = document.querySelector(".confetti");
  const confettiColors = [
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
  ];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti-piece");
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDelay = `${Math.random() * 5}s`;
    confetti.style.backgroundColor =
      confettiColors[Math.floor(Math.random() * confettiColors.length)];
    confettiContainer.appendChild(confetti);
  }
});
