// VARIÁVEIS E ARRAYS

let resp = document.getElementById("sorted-word");
let palavra_array = [];
let palavra_final = [];
let let_repetidas = [];
let letras_erradas = [];

let cont = 0;
let life = 7;
life1 = 0;

const getHangmanWord = async () => {
  const URL = "https://suellen-hangman-api.herokuapp.com/api/v1/words";

  return fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    });
};

// SORTEIA UM OBJETO ALEATÓRIO / MOSTRA UMA CATEGORIA E UMA PALAVRA

const sortObj = (words) => {
  let randomNumber = Math.floor(Math.random() * words.length);
  showCategory = document.getElementById("category");
  showCategory.textContent = words[randomNumber].category.toUpperCase();

  return words[randomNumber];
};

const updateLifeElement = (life) => {
  let lifeElement = document.getElementById("lifes");
  lifeElement.textContent = `Lifes: ${life}`;
};

const mudarImg = (life) => {
  //MOSTRAR IMAGEM EM ETAPAS DA FORCA
  if (life == 0) {
    document.getElementById("forca-image").src = "./assets/images/forca0.jpg";
    window.location.href = "perdeu.html";
  } else if (life == 1) {
    document.getElementById("forca-image").src = "./assets/images/forca1.jpg";
  } else if (life == 2) {
    document.getElementById("forca-image").src = "./assets/images/forca2.jpg";
  } else if (life == 3) {
    document.getElementById("forca-image").src = "./assets/images/forca3.jpg";
  } else if (life == 4) {
    document.getElementById("forca-image").src = "./assets/images/forca4.jpg";
  } else if (life == 5) {
    document.getElementById("forca-image").src = "./assets/images/forca5.jpg";
  } else if (life == 6) {
    document.getElementById("forca-image").src = "./assets/images/forca6.jpg";
  }
};

const trocar = (letra) => {
  if (!letras_erradas.some((letraErrada) => letraErrada === letra)) {
    while (cont < palavra_array.length) {
      // LINHAS
      palavra_final.push("_");
      cont++;
    }
    resp.innerHTML = palavra_final.join(" ");

    if (letra == "") {
      resp.innerHTML = palavra_final.join(" ");
    } else if (palavra_array.includes(letra)) {
      // TROCA DE LINHAS POR LETRAS
      idx = palavra_array.indexOf(letra);

      while (idx != -1) {
        let_repetidas.push(idx);
        palavra_final[idx] = letra;
        idx = palavra_array.indexOf(letra, idx + 1);
      }

      resp.innerHTML = palavra_final.join(" ");

      if (!palavra_final.includes("_")) {
        //NEGA A PROCURA DO ('_') E REDIRECIONA PARA A PÁGINA DE VENCEDOR.
        window.location.href = "venceu.html";
      }
    } else {
      //SE ERRAR A LETRA ENTRA AQUI E DIMINUI O LIFE E CHAMA A FUNÇÃO PRA MUDAR A IMAGEM
      letras_erradas.push(letra);
      life--;
      mudarImg(life);
      updateLifeElement(life);
      localStorage.setItem(life1, life);
    }
  }
};

const replay = () => {
  location.reload();
};

const run = async () => {
  let words = await getHangmanWord();
  let palavraObj = sortObj(words);
  console.log(palavraObj);
  palavra_array = palavraObj.name.toUpperCase().split("");

  updateLifeElement(life);
  mudarImg(6);
  trocar();
};

run();
