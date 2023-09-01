// clienteRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
const adminConController = require('./controllers/Admin');
const estoqueController = require('./controllers/Estoque');
const movimentacaoEstoque = require ('./controllers/MovimentacaoEstoque');
const portfolioController = require('./controllers/Portfolio');

//Rotas Agenda Confirma
router.post('/createAgenda', agendaController.createAgenda);
router.get('/selectAgenda', agendaController.getAllAgendas);
router.put('/updateAgenda/:id', agendaController.updateAgenda);
router.delete('/deleteAgenda/:id', agendaController.deleteAgenda);

//Rotas Agenda Consulta
router.post('/createAgendaCon', agendaConController.createAgendaConsulta);
router.get('/selectAgendaCon', agendaConController.getAllAgendaConsulta);
router.put('/updateAgendaCon/:id', agendaConController.updateAgendaConsulta);
router.delete('/deleteAgendaCon/:id', agendaConController.deleteAgendaConsulta);

//Rotas Admin
router.post('/createAdmin', adminConController.createAdmin);
router.get('/selectAdmin', adminConController.getAllAdmin);
router.put('/updateAdmin/:id', adminConController.updateAdmin);
router.delete('/deleteAdmin/:id', adminConController.deleteAdmin); 
//Rotas Portifólio
router.post('/createPortfolio', portfolioController.createPortfolio);
router.get('/selectPortfolio', portfolioController.getAllPortfolio);
router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);
router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);

// Rotas Estoque
router.post('/createItemEstoque', estoqueController.createItemEstoque);
router.get('/selectItemEstoque', estoqueController.getAllEstoque);
router.put('/updateItemEstoque/:id', estoqueController.updateItemEstoque);
router.delete('/deleteItemEstoque/:id', estoqueController.deleteItemEstoque)

//Rotas Portfólio
router.post('/createPortfolio', portfolioController.createPortfolio);
router.get('/selectPortfolio', portfolioController.getAllPortfolio);
router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);
router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);

//Rotas Movimentacao Estoque
router.post('/createMovimentacaoEstoque', movimentacaoEstoque.createMovimentacaoHistorico);
router.get('/selectMovimentacaoEstoque', movimentacaoEstoque.getAllMovimentacaoHistorico);
router.delete('/deleteMovimentacaoEstoque/:id', movimentacaoEstoque.deleteMovimentacaoHistorico);
router.delete('/deleteTodaMovimentacaoEstoque', movimentacaoEstoque.deleteTodasMovimentacoesEHistorico);

module.exports = router;
