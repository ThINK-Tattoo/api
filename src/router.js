// clienteRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
const adminConController = require('./controllers/Admin');
const estoqueConController = require('./controllers/Estoque');
const clienteController = require('./controllers/Cliente');
const portifolioController = require('./controllers/Portifolio');
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
router.post('/createPortifolio', portifolioController.createPortifolio);
router.get('/selectPortifolio', portifolioController.getAllPortifolio);
router.put('/updatePortifolio/:id', portifolioController.updatePortifolio);
router.delete('/deletePortifolio/:id', portifolioController.deletePortifolio);

// Rotas Estoque
router.post('/createItemEstoque', estoqueConController.createItemEstoque);
router.get('/selectItemEstoque', estoqueConController.getAllEstoque);
router.put('/updateItemEstoque/:id', estoqueConController.updateItemEstoque);
router.delete('/deleteItemEstoque/:id', estoqueConController.deleteItemEstoque);

//Rotas Portfólio
router.post('/createPortfolio', portfolioController.createPortfolio);
router.get('/selectPortfolio', portfolioController.getAllPortfolio);
router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);
router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);

//Rotas Cliente
router.post('/createCliente', clienteController.createCliente);
router.get('/selectCliente', clienteController.getAllCliente);
router.put('/updateCliente/:id', clienteController.updateCliente);
router.delete('/deleteCliente/:id', clienteController.deleteCliente);

module.exports = router;
