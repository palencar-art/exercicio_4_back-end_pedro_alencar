const fs = require('fs');
const path = require('path');

const pastaDados = path.join(__dirname, 'dados');
const caminhoArquivo = path.join(pastaDados, 'produtos.json');

// 1. Estrutura Inicial (Pasta)
if (!fs.existsSync(pastaDados)) {
    fs.mkdirSync(pastaDados);
    console.log('Pasta "dados" criada.');
}

// 2. Cadastro Inicial
const produtosIniciais = [
    { id: 1, produto: 'Teclado Mecânico', preco: 250 },
    { id: 2, produto: 'Mouse Gamer', preco: 150 }
];

function inicializarArquivo() {
    const data = JSON.stringify(produtosIniciais, null, 2);
    fs.writeFileSync(caminhoArquivo, data);
    console.log('Arquivo inicial produtos.json criado.');
}

// 3. Leitura e 4. Atualização
function adicionarProduto(novoProduto) {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
        const produtos = JSON.parse(conteudo);
        
        produtos.push(novoProduto);
        
        fs.writeFileSync(caminhoArquivo, JSON.stringify(produtos, null, 2));
        console.log(`Produto "${novoProduto.produto}" adicionado com sucesso!`);
    } catch (erro) {
        console.error('Erro ao atualizar catálogo:', erro.message);
    }
}

// 5. Operações Assíncronas (Demonstração)
function lerProdutosAssincrono() {
    console.log('--- Iniciando leitura assíncrona ---');
    fs.readFile(caminhoArquivo, 'utf-8', (err, data) => {
        if (err) throw err;
        const produtos = JSON.parse(data);
        console.log('Leitura finalizada! Produtos:', produtos.length);
    });
    console.log('Mensagem de prova: Esta linha roda ANTES da leitura terminar!');
}

// 6. Funcionalidade de Busca
function buscarPorId(id) {
    try {
        const conteudo = fs.readFileSync(caminhoArquivo, 'utf-8');
        const produtos = JSON.parse(conteudo);
        const encontrado = produtos.find(p => p.id === id);
        return encontrado || null;
    } catch (erro) {
        console.error('Erro na busca:', erro.message);
        return null;
    }
}

// Execução de teste
inicializarArquivo();
adicionarProduto({ id: 3, produto: 'Monitor 144Hz', preco: 1200 });

const resultado = buscarPorId(2);
console.log('Busca por ID 2:', resultado);

lerProdutosAssincrono();
