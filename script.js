let celulas = document.getElementsByClassName("cell");
let turno = "X";
let jogoAtivo = true;
let pontosx = 0;
let pontoso = 0;

for (let i = 0; i < celulas.length; i++) {
    celulas[i].addEventListener("click", function() {
        if (this.textContent === "" && jogoAtivo) {
            this.textContent = turno;
            this.classList.add(turno); // adiciona 'X' ou 'O'

            if (verificarVitoria()) {
                jogoAtivo = false;
                setTimeout(() => {
                    document.getElementById("vencedor").innerHTML = `Jogador ${turno} venceu!`;
                }, 100);
                if (turno === "X") {
                    pontosx++;
                    document.getElementById("pontosx").textContent = pontosx;
                } else {
                    pontoso++;
                    document.getElementById("pontoso").textContent = pontoso;
                }
                return;
            }

            // verificar empate
            if ([...celulas].every(c => c.textContent !== "")) {
                jogoAtivo = false;
                setTimeout(() => {
                    document.getElementById("vencedor").innerHTML = `Os jogadores empataram!`;
                }, 100);
                return;
            }

            turno = (turno === "X") ? "O" : "X";
        }
    });
}

function verificarVitoria() {
    const linhas = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
        [0, 4, 8], [2, 4, 6]             // diagonais
    ];

    for (let i = 0; i < linhas.length; i++) {
        const [a, b, c] = linhas[i];
        if (celulas[a].textContent !== "" &&
            celulas[a].textContent === celulas[b].textContent &&
            celulas[a].textContent === celulas[c].textContent) {
            return true;
        }
    }
    return false;
}

function reiniciarJogo() {
    for (let i = 0; i < celulas.length; i++) {
        celulas[i].textContent = "";
        celulas[i].classList.remove("X", "O"); // remove as cores
    }
    turno = "X";
    jogoAtivo = true;
    document.getElementById("vencedor").innerHTML = "";
}
