const botaoAbrir = document.getElementById('menuAbrir');
const botaoFechar = document.getElementById('menuFechar');
const menu = document.querySelector('.menuPrincipal')

botaoAbrir.addEventListener('click', abrirMenu);
botaoFechar.addEventListener('click', fecharMenu);

function abrirMenu(){
    menu.style.top = '60px';
    botaoAbrir.style.display = 'none';
    botaoFechar.style.display = 'inline-block'
}

function fecharMenu(){
    menu.style.top = '0px';
    botaoAbrir.style.display = 'inline-block';
    botaoFechar.style.display = 'none'
}

