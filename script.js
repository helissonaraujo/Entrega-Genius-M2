function addItemHTML() {
    let listaItens = document.querySelector('.genius-body')
    listaItens.insertAdjacentHTML('beforeend', `
    <button class=botao-top-esquerdo id=0></button>
                <button class=botao-top-direito id=1></button>
                <button class=controle id=controle> Começar </button>
                <button class=botao-bottom-esquerdo id=2></button>
                <button class=botao-bottom-direito id=3></button>
    `);
};
addItemHTML();

let ids = []
let rodadas = [];
let pontosUsuario = 0;
const controle = document.querySelector('.botao');
const start = document.getElementById('controle');
const pontos = document.querySelector('.pontuacao');
const nivel = document.querySelector('.nivel');

//criar função que inicie a sequencia de cores
function iniciarSequencia() {
    for (let i = 0; i < 1; i++) {
        rodadas.push(Math.floor(Math.random(3, 0) * 4));
    } console.log(rodadas)
    verifica()
}

//função que inicia o jogo
function iniciar() {
    start.addEventListener('click', iniciarJogo)
}

function iniciarJogo() {
    setTimeout(function () {
        start.style.display = "flex"
        setTimeout(function () {
            start.innerText = "3"
            setTimeout(function () {
                start.innerText = "2"
                setTimeout(function () {
                    start.innerText = "1"
                    setTimeout(function () {
                        start.innerText = "Go"
                        setTimeout(function () {
                            start.style.display = "none"
                            setTimeout(function () {
                                ids = []
                                iniciarSequencia();
                                rodadas.forEach(function (elemento, index) {
                                    setTimeout(function () {
                                        document.getElementById(`${elemento}`).classList.add('clicked');
                                        setTimeout(function () {
                                            document.getElementById(`${elemento}`).classList.remove('clicked');
                                        }, 900);
                                    }, 1000 * index)

                                });
                            }, 5)
                        }, 400)
                    }, 400)
                }, 400)
            }, 400)
        }, 1500)
    }, 2)
}


//verificar se acertou ou não
function verifica() {

    const bot = document.getElementById(`${rodadas[rodadas.length - 1]}`)
    bot.addEventListener('click', verificarSequencia)
}

function verificarSequencia(e) {
    let id = e.target.id;
    ids.push(id);
    if (ids.length === rodadas.length) {
        if (ids.toString() === rodadas.toString()) {
            start.innerText = `Parabens, você fez ${pontosUsuario + 2} pontos`
            pontosUsuario += 2;
            pontos.innerHTML = pontosUsuario;
            nivel.innerHTML = rodadas.length;
            iniciarJogo()

        } else {
            pontosUsuario = 0;
            pontos.innerHTML = pontosUsuario;
            ids = [];
            rodadas = [];
            start.style.display = "flex"
            start.innerText = "Jogar Novamente"
            nivel.innerHTML = 0;
            alert("Game over")
        }
    }
    else {
        verifica();
    }
}

iniciar();