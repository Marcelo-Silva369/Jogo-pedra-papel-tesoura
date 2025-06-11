var elementos = document.querySelectorAll(".player-options img");
var playerOpt = "";
var computadorOpt = "";

// Função para resetar a opacidade dos elementos
// Ela basicamente vai setar a opacidade de todos os elementos para 0.7
// e a cor de fundo para branco
function reseteOpacityPlayer() {
  for (var i = 0; i < elementos.length; i++) {
    elementos[i].style.opacity = 0.7;
    elementos[i].style.backgroundColor = "white";
  }
}

// Já está função faze o mesmo que a acima, mas com um switch case
// O switch case vai setar o texto do h1 de acordo com o resultado
function atualizarTitulo(resultado) {
  const titulo = document.querySelector(".title");
  switch (resultado) {
    case "ganhou":
      titulo.textContent = "Parabéns, você ganhou!";
      break;
    case "perdeu":
      titulo.textContent = "Que pena, Você perdeu!";
      break;
    case "empate":
      titulo.textContent = "Deu Empate, Jogue de novo!";
      break;
  }
}

// Essa função vai resetar a opacidade dos elementos do inimigo
function resetInimigo() {
  const computerOptions = document.querySelectorAll(".computer-options img");
  for (var i = 0; i < computerOptions.length; i++) {
    computerOptions[i].style.opacity = 0.7;
    computerOptions[i].style.backgroundColor = "white";
  }
}

// Essa função vai jogar o inimigo ou seja vai escolher uma opção aleatoria
function inimigoJogar() {
  let computadorOpt = Math.floor(Math.random() * 3);

  const computerOptions = document.querySelectorAll(
    ".computer-options  div > img"
  );
  resetInimigo();

  //Esse for é usado para setar a opacidade de acordo com a opção escolhida
  // e a cor de fundo para branco
  // Ou seja, ele vai setar a opacidade para 1 e a cor de fundo para branco
  for (var i = 0; i < computerOptions.length; i++) {
    if (i == computadorOpt) {
      computerOptions[i].style.opacity = 1;
      inimigoOpt = computerOptions[i].getAttribute("opt");
    } else {
      computerOptions[i].style.opacity = 0.7;
      computerOptions[i].style.backgroundColor = "white";
    }
  }

  //esses dois consts vai pegar a opção escolhida pelo player e pelo computador
  const playerImage = document.querySelector(
    `.player-options img[opt="${playerOpt}"]`
  );
  const computerImage = document.querySelector(
    `.computer-options img[opt="${inimigoOpt}"]`
  );

  // E esse if vai verificar se o player ganhou, perdeu ou se houve empate
  // Ai de acordo com o resultado ele vai setar o texto do h1
  if (playerOpt == inimigoOpt) {
    atualizarTitulo("empate");
    playerImage.style.backgroundColor = "rgb(229, 212, 55)";
    computerImage.style.backgroundColor = "rgb(229, 212, 55)";
  } else if (
    (playerOpt == "pedra" && inimigoOpt == "tesoura") ||
    (playerOpt == "tesoura" && inimigoOpt == "papel") ||
    (playerOpt == "papel" && inimigoOpt == "pedra")
  ) {
    atualizarTitulo("ganhou");
    playerImage.style.backgroundColor = "rgb(37, 227, 183)";
    computerImage.style.backgroundColor = "rgb(37, 227, 183)";
  } else {
    atualizarTitulo("perdeu");
    playerImage.style.backgroundColor = "rgb(220, 63, 63)";
    computerImage.style.backgroundColor = "rgb(220, 63, 63)";
  }
}

let jogoEmAndamento = false;

// Esse for vai setar a opacidade de acordo com a opção escolhida pelo player
// e a cor de fundo para branco
// Ou seja, ele vai setar a opacidade para 1 e a cor de fundo para branco
for (var i = 0; i < elementos.length; i++) {
  elementos[i].addEventListener("click", function (t) {
    if (!jogoEmAndamento) {
      jogoEmAndamento = true;
      reseteOpacityPlayer();
      t.target.style.opacity = 1;
      playerOpt = t.target.getAttribute("opt");

      inimigoJogar();
    }
  });
}

const botaoJogarNovo = document.querySelector(".novo-jogo");

// Essa função vai resetar o jogo
botaoJogarNovo.addEventListener("click", () => {
  jogoEmAndamento = false;
  // Restaura a jogo antiga
  reseteOpacityPlayer();
  resetInimigo();

  // Atualiza o texto do H1
  atualizarTitulo("inicial");
  document.querySelector(".title").textContent =
    "Vamos lá: Pedra, Papel ou Tesoura!";

  // restaura a cor de fundo original
  document.querySelector(".player-options img").style.backgroundColor = "white";
  document.querySelector(".computer-options img").style.backgroundColor =
    "white";

  playerOpt = "";
  inimigoOpt = "";
});
