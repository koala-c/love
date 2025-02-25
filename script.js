document.addEventListener("DOMContentLoaded", async () => {
  const btnVersiculo = document.querySelector("#siguiente-versiculo");
  const btnInspiracion = document.querySelector("#inspiracion-btn");
  const versiculoTexto = document.querySelector("#versiculo-texto");
  const versiculoNumero = document.querySelector("#versiculo-numero");
  const resultadoTexto = document.querySelector("#resultado");

  let versiculos = [];
  let indice = 0;

  // Cargar los versículos desde el archivo JSON
  async function cargarVersiculos() {
    try {
      const response = await fetch("verses.json");
      const data = await response.json();
      versiculos = data["1 CORINTIOS 13"].map((v) => ({
        numero: v.versiculo,
        texto: v.texto,
      }));

      if (versiculos.length > 0) {
        versiculoNumero.textContent = versiculos[0].numero;
        versiculoTexto.textContent = versiculos[0].texto;
      }
    } catch (error) {
      console.error("Error al cargar los versículos:", error);
      versiculoTexto.textContent = "Error al cargar los versículos.";
    }
  }

  // Evento para cambiar de versículo en orden
  if (btnVersiculo) {
    btnVersiculo.addEventListener("click", () => {
      if (versiculos.length > 0) {
        indice = (indice + 1) % versiculos.length;
        versiculoNumero.textContent = versiculos[indice].numero;
        versiculoTexto.textContent = versiculos[indice].texto;
      }
    });
  }

  // Evento para mostrar mensajes aleatorios de inspiración
  if (btnInspiracion) {
    btnInspiracion.addEventListener("click", () => {
      const messages = [
        "El amor todo lo soporta 💖",
        "El amor es paciente y bondadoso 🕊️",
        "Sin amor, nada soy... ❤️",
        "El amor nunca deja de ser ✨",
      ];
      const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
      resultadoTexto.textContent = randomMessage;
    });
  }

  await cargarVersiculos(); // Cargar los versículos al inicio

  // Agregar scroll suave a los enlaces de la barra lateral
  const sidebarLinks = document.querySelectorAll(".sidebar ul li a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({ top: targetSection.offsetTop, behavior: "smooth" });
      }
    });
  });
});
