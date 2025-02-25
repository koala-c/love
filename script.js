document.addEventListener("DOMContentLoaded", async () => {
  const btnVersiculo = document.querySelector("#siguiente-versiculo");
  const btnInspiracion = document.querySelector("#inspiracion-btn");
  const versiculoTexto = document.querySelector("#versiculo-texto");
  const versiculoNumero = document.querySelector("#versiculo-numero");
  const resultadoTexto = document.querySelector("#resultado");
  const capituloSelect = document.getElementById("capitulo");

  let versiculos = [];
  let indice = 0;
  let data = {}; // Variable global para almacenar los datos

  // Función para cargar un capítulo
  function cargarCapitulo(capitulo) {
    cargarVersiculos(capitulo); // Llamamos a cargarVersiculos con el capítulo seleccionado
  }

  // Función para cargar los versículos de un capítulo
  async function cargarVersiculos(capitulo) {
    try {
      // Si los datos aún no se han cargado, los cargamos
      if (Object.keys(data).length === 0) {
        const response = await fetch("json/verses.json");
        data = await response.json(); // Guardamos los datos en la variable 'data'
      }

      if (data[capitulo]) {
        versiculos = data[capitulo].map((v) => ({
          numero: v.versiculo,
          texto: v.texto,
        }));

        if (versiculos.length > 0) {
          versiculoNumero.textContent = versiculos[0].numero;
          versiculoTexto.textContent = versiculos[0].texto;
        }
      } else {
        versiculoTexto.textContent =
          "No hay versículos disponibles para este capítulo.";
      }
    } catch (error) {
      console.error("Error al cargar los versículos:", error);
      versiculoTexto.textContent = "Error al cargar los versículos.";
    }
  }

  // Llenar el select con los capítulos disponibles en el JSON
  function llenarSelect() {
    Object.keys(data).forEach((capitulo) => {
      const option = document.createElement("option");
      option.value = capitulo;
      option.textContent = capitulo;
      capituloSelect.appendChild(option);
    });

    // Al seleccionar un capítulo, se carga el primer versículo
    capituloSelect.addEventListener("change", function () {
      const capituloSeleccionado = capituloSelect.value;
      cargarCapitulo(capituloSeleccionado); // Cargamos los versículos del capítulo seleccionado
    });

    // Cargar el primer capítulo por defecto
    cargarCapitulo(Object.keys(data)[0]); // Cargar el primer capítulo disponible
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

  // Función para mostrar un mensaje aleatorio
  const mostrarMensajeAleatorio = () => {
    const messages = [
      "El amor todo lo soporta 💖",
      "El amor es paciente y bondadoso 🕊️",
      "Sin amor, nada soy... ❤️",
      "El amor nunca deja de ser ✨",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    resultadoTexto.textContent = randomMessage;
  };

  // Mostrar un mensaje aleatorio al inicio
  mostrarMensajeAleatorio();

  // Evento para cambiar el mensaje aleatorio al hacer clic
  if (btnInspiracion) {
    btnInspiracion.addEventListener("click", mostrarMensajeAleatorio);
  }

  // Cargar los versículos al inicio
  await cargarVersiculos("1 CORINTIOS 13"); // Cargar los versículos del capítulo inicial (puede ser cualquier capítulo)

  // Llenar el select con los capítulos
  llenarSelect();

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
