import { renderizarCatalogo } from "./src/cartaoProduto";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { inicializarCarrinho, atualizarprecoCarrinho, renderizarProdutosCarrinho, } from "./src/menuCarrinho";




renderizarCatalogo();
inicializarCarrinho();
atualizarprecoCarrinho();
renderizarProdutosCarrinho();
inicializarFiltros();
