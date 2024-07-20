const html = document.querySelector('html'); //seleciona todo o documento HTML
const focoBt = document.querySelector('.app__card-button--foco'); //selectiona o botão de foco.
const curtoBt = document.querySelector('.app__card-button--curto'); // seleciona o botão de descanso curto
const longoBT = document.querySelector('.app__card-button--longo'); //seleciona o botão de desacanso longo, para que quando tenha o evento de clique, possam ser alterados de acordo com o contexto
const banner = document.querySelector('.app__image'); //seleciona a classe das imagens, que devem ser alteradas a cada clique que damos nos botões, alterando assim o contexto da página
const titulo = document.querySelector('.app__title'); //seleciona a classe do titulo do elemento, que será chamada posteriosmente pela função alterarContexto;
const botoes = document.querySelectorAll('.app__card-button'); //querySelectorAll puxa todos os elementos que possuem a classe app__card-button!!!
const startPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('.toggle-checkbox');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const botaoPause = document.querySelector('#start-pause')
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioBeep = new Audio('/sons/beep.mp3');
const audioPlay = new Audio('/sons/play.wav');
const audioPause = new Audio('/sons/pause.mp3');
const iniciarOuPausarBticon = document.querySelector(".app__card-primary-butto-icon");
const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musica.loop = true;

musicaFocoInput.addEventListener('change', ()=>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
});
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
  alterarContexto('foco');
  focoBt.classList.add('active')

})//adiciona o evento de clique ao botão de foco e posteriormente chama a função alterarContexto, que mexe com toda a estrutura da página (imagnes e texto)

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtoBt.classList.add('active')
})//adiciona o evento de clique ao botão de foco e posteriormente chama a função alterarContexto, que mexe com toda a estrutura da página (imagnes e texto)

longoBT.addEventListener('click', () => {
tempoDecorridoEmSegundos = 900;
   alterarContexto('descanso-longo');
   longoBT.classList.add('active')
})//adiciona o evento de clique ao botão de foco e posteriormente chama a função alterarContexto, que mexe com toda a estrutura da página (imagnes e texto)

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    }) //função que remove o style ACTIVE após a troca de tipo de botões e descansos!
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)//altera a imagem  da página, utilizando uma template string
    switch(contexto){
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
        break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta.</strong>`
        break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    } //swtich utilizado no evento contexto para alterar o texto que aparecerá na página de acordo com o tipo de momento em que o usuário estiver!
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        audioBeep.play();
        alert('Tempo Finalizado!')
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}
startPauseBt.addEventListener('click',  iniciarPausar);

function iniciarPausar(){
    if(intervaloId){
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000)
    iniciarOuPausarBt.textContent = "Pausar";
    iniciarOuPausarBticon.setAttribute('src', '/imagens/pause.png');
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBticon.setAttribute('src', '/imagens/play_arrow.png');
    intervaloId = null
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR", {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`
    
}

mostrarTempo()