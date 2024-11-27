const express = require('express');
const ProprietarioController = require('../controllers/ProprietarioController');

const router = express.Router();

router.get('/proprietario/:id', ProprietarioController.buscaProprietario);
router.get('/proprietarios', ProprietarioController.listarProprietarios);
router.post('/proprietario', ProprietarioController.criarProprietarios);
router.delete('/proprietario/:id', ProprietarioController.deletarProprietario);
router.put('/proprietario/:id', ProprietarioController.atualizarProprietario);
router.get('/proprietarios/busca-nome/:nome', ProprietarioController.buscaNome);
router.get(
  '/proprietarios/mais-produtos',
  ProprietarioController.maiorQuantidadeProdutos
);

module.exports = router;
