export const catalogo = [
    {
        id: "1",
        nome: "Camisa Larga com Bolsos",
        marca: 'Zara',
        preco: 70,
        imagem:  'product-1.jpg',
        feminino: false,
    },
    {
        id: "2",
        nome: "Casaco Reto com Lã",
        marca: 'Zara',
        preco: 85,
        imagem:  'product-2.jpg',
        feminino: true,
    },
    {
        id: "3",
        nome: "Jaqueta com Efeito Camurça",
        marca: 'Zara',
        preco: 60,
        imagem:  'product-3.jpg',
        feminino: false,
    },
    {
        id: "4",
        nome: "Sobretudo em Mescla de lã",
        marca: 'Zara',
        preco: 160,
        imagem:  'product-4.jpg',
        feminino: false,
    },
    {
        id: "5",
        nome: "Camisa Larga Acolchoada de Veludo Cotelê",
        marca: 'Zara',
        preco: 110,
        imagem:  'product-5.jpg',
        feminino: false,
    },
    {
        id: "6",
        nome: "Casaco de Lã com Botões",
        marca: 'Zara',
        preco: 170,
        imagem:  'product-6.jpg',
        feminino: true,
    },
    {
        id: "7",
        nome: "Casaco com Botões",
        marca: 'Zara',
        preco: 75,
        imagem:  'product-7.jpg',
        feminino: true,
    },
    {
        id: "8",
        nome: "Colete Comprido com cinto",
        marca: 'Zara',
        preco: 88,
        imagem:  'product-8.jpg',
        feminino: true,
    },
];
//Salvando no proprio navegador
export function salvarLocalStorage(chave, informacao){
    localStorage.setItem(chave, JSON.stringify(informacao));//transforma em string JSON
}

//Lendo no proprio navegador
export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));//transforma em objeto JSON
}