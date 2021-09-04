// VARIABLES
const d = document,
  $formulario = d.getElementById("formulario"),
  $listaTuits = d.getElementById("lista-tweets"),
  $btnAgregar = d.getElementById("agregar-btn"),
  $textArea = d.getElementById("tweet");
let tweets = [];

// EVENTOS
start();

function start() {
  disabledBtn();
  $textArea.addEventListener("input", validarTextArea);
  $formulario.addEventListener("submit", agregandoTweet);

  // Obtenemos los tweets guardados en localStorage una vez cargado el doc
  d.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    console.log(tweets);
    creandoHTML();
  });
}

// FUNCIONES

// Deshabilita el boton de `agregar` al iniciar la app
function disabledBtn() {
  $btnAgregar.disabled = true;
  $btnAgregar.classList.add("true");
}

// Valida que el ´textarea´ no este vacio para poder usar el boton `agregar`
function validarTextArea(e) {
  // console.log(e.target.value)
  if (e.target.value !== "") {
    $btnAgregar.disabled = false;
    $btnAgregar.classList.remove("true");
  } else {
    disabledBtn();
  }
}

// Agrega
function agregandoTweet(e) {
  e.preventDefault();
  // console.log($textArea.value)
  let tweet = $textArea.value;

  const tweetObjeto = {
    id: Date.now(),
    tweet,
  };

  // Añadiendo al arreglo de `tweets`
  tweets = [...tweets, tweetObjeto];
  console.log(tweets);

  // Creamos el HTML
  creandoHTML();

  // Refrescar formulario
  $formulario.reset();
  disabledBtn();
}

// Muestra el listados de los tuits
function creandoHTML() {
  limpiandoHTML();

  const fragment = d.createDocumentFragment();

  if (tweets.length > 0) {
    // Iteramos por el arreglo
    tweets.forEach((tweet) => {
      // Botón eliminar
      const btnEliminar = d.createElement("a");
      btnEliminar.classList.add("borrar-tuit");
      btnEliminar.textContent = "X";

      // Eliminando tweet
      btnEliminar.onclick = () => {
        eliminarTweet(tweet.id);
      };

      const li = d.createElement("li");
      li.textContent = tweet.tweet;
      li.appendChild(btnEliminar);

      // $listaTuits.appendChild(li)
      fragment.appendChild(li);
    });
    $listaTuits.appendChild(fragment);
  }
  localSto();
}

// Agregando los tuits a localStorage
function localSto() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// Borra un tuit ya creado
function eliminarTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  creandoHTML();
}

// Limpiando HTML de `Mis Tweets`
function limpiandoHTML() {
  while ($listaTuits.firstChild) {
    $listaTuits.removeChild($listaTuits.firstChild);
  }
}