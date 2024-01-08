import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {
    //dicionários com as chaves de id dos objetos e suas quantidade
};

function abrirCarrinho() {
    //pegando o elemento do carrinho para trabalhar nele
    document.getElementById("carrinho").classList.add('right-[0px]');
    document.getElementById("carrinho").classList.remove('right-[-360px]');
}

function fecharCarrinho() {
    //pegando o elemento do carrinho para trabalhar nele
    document.getElementById("carrinho").classList.remove('right-[0px]');
    document.getElementById("carrinho").classList.add('right-[-360px]');
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);//evento (ação) de click no botão
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

function removerDoCarrinho(idProduto){
    //apagando do dicionário 
    delete idsProdutoCarrinhoComQuantidade[idProduto]; 
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    atualizarprecoCarrinho();
    //cria novo carrinho
    renderizarProdutosCarrinho();
}

function incrementarQuantidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    atualizarprecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeProduto(idProduto){
    //Se existir apenas 1 produto no dicionario remove do carrinho
    if (idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerDoCarrinho(idProduto);
        return ;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    atualizarprecoCarrinho();
    atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto){
    //atualizando quantidade no card do carrinho
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);//buscando o objeto no catalogo
    const containerProdutosCarrinho = document.getElementById('produtos-carrinho');

    //elemento e html em JS
    const elementoArticle = document.createElement("article");//<article></article>
    const articleClasses = ["flex", "bg-slate-100", "rounded-lg", "p-1", "relative"];

    for (const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `<button id="remover-item-${produto.id}" class="absolute top-0 right-2">
      <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
    </button>
    <img src="./assets/img/${produto.imagem}" alt="Carrinho: ${produto.nome}" class="h-24 rounded-lg">
    <div class="p-2 flex flex-col justify-between">
      <p  class="text-slate-900 text-sm">${produto.nome}</p>
      <p class="text-slate-400 text-xs">Tamanho: M</p>
      <p class="text-green-700 text-lg">$${produto.preco}</p>
    </div> 
    <div class='flex text-slate-950 items-end absolute bottom-0 right-2 text-lg'>
        <button id='decrementar-produto-${produto.id}'> 
            -
        </button>
        <p id='quantidade-${produto.id}' class='ml-2'>
            ${idsProdutoCarrinhoComQuantidade[produto.id]}
        </p>
        <button id='incrementar-produto-${produto.id}' class='ml-2'> 
            +
        </button>
    </div>`;

    //adicionando o texto de html dentro da tag article
    elementoArticle.innerHTML = cartaoProdutoCarrinho;

    //add elemento article completo dentro do container
    containerProdutosCarrinho.appendChild(elementoArticle);

    document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeProduto(produto.id));
    document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeProduto(produto.id));
    document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));

}

export function renderizarProdutosCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";
    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoNoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto){
    //verifica se idproduto esta dentro do dicionario idsProdutoCarrinhoComQuantidade.
    if(idProduto in idsProdutoCarrinhoComQuantidade){
        incrementarQuantidadeProduto(idProduto);
        return ;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1; //cria um dicionario na variavel com chave idProduto
    salvarLocalStorage("carrinho", idsProdutoCarrinhoComQuantidade);
    desenharProdutoNoCarrinho(idProduto);    
    atualizarprecoCarrinho();
}

export function atualizarprecoCarrinho(){
    const precoCarrinho = document.getElementById("preco-total");
    let precoTotalCarrinho = 0;
    for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
        precoTotalCarrinho += catalogo.find((p) => p.id === idProdutoNoCarrinho).preco *
         idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
    }
    precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}
