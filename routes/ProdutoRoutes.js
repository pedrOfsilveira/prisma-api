const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();
router.get('/produto/:id', ProdutoController.buscaProduto);
router.get('/produtos', ProdutoController.listarProdutos);
router.post('/produto', ProdutoController.criarProduto);
router.delete('/produto/:id', ProdutoController.deletarProduto);
router.put('/produto/:id', ProdutoController.atualizarProduto);
router.get('/produtos/maior-quantidade', ProdutoController.quantidadeProduto);
router.get('/produtos/maior-valor', ProdutoController.valorProduto);
router.get('/produtos/maior-valor-total', ProdutoController.valorTotal);

module.exports = router;
