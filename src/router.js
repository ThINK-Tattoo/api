// clientesRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
<<<<<<< HEAD
const adminConController = require('./controllers/Admin');
const estoqueController = require('./controllers/Estoque');
const movimentacaoEstoque = require ('./controllers/MovimentacaoEstoque');
=======
const adminController = require('./controllers/Admin');
>>>>>>> ac7bcea5b4cc132acfc570a172f71bd5e6f3fa4d
const portfolioController = require('./controllers/Portfolio');
const estoqueConController = require('./controllers/Estoque');
<<<<<<< HEAD
const clientesController = require('./controllers/clientes');

=======
const clienteController = require('./controllers/Cliente');
const flashTattooController = require('./controllers/FlashTatto');
>>>>>>> 78213ca05bc270264d59402a44a2500a8269fe0f

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
<<<<<<< HEAD
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
=======
router.post('/createAdmin', adminController.createAdmin);
router.get('/selectAdmin', adminController.getAllAdmin);
router.put('/updateAdmin/:id', adminController.updateAdmin);
router.delete('/deleteAdmin/:id', adminController.deleteAdmin); 
>>>>>>> ac7bcea5b4cc132acfc570a172f71bd5e6f3fa4d

//Rotas Portfólio
router.post('/createPortfolio', portfolioController.createPortfolio);
router.get('/selectPortfolio', portfolioController.getAllPortfolio);
router.put('/updatePortfolio/:id', portfolioController.updatePortfolio);
router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);

<<<<<<< HEAD
//Rotas Movimentacao Estoque
router.post('/createMovimentacaoEstoque', movimentacaoEstoque.createMovimentacaoHistorico);
router.get('/selectMovimentacaoEstoque', movimentacaoEstoque.getAllMovimentacaoHistorico);
router.delete('/deleteMovimentacaoEstoque/:id', movimentacaoEstoque.deleteMovimentacaoHistorico);
router.delete('/deleteTodaMovimentacaoEstoque', movimentacaoEstoque.deleteTodasMovimentacoesEHistorico);
=======
// Rotas Estoque
router.post('/createItemEstoque', estoqueConController.createItemEstoque);
router.get('/selectItemEstoque', estoqueConController.getAllEstoque);
router.put('/updateItemEstoque/:id', estoqueConController.updateItemEstoque);
router.delete('/deleteItemEstoque/:id', estoqueConController.deleteItemEstoque);

//Rotas clientes
router.post('/createclientes', clientesController.createclientes);
router.get('/selectclientes', clientesController.getAllclientes);
router.put('/updateclientes/:id', clientesController.updateclientes);
router.delete('/deleteclientes/:id', clientesController.deleteclientes);

//Rotas Flash Tattoo
router.post('/createFlashTattoo', flashTattooController.createFlashTattoo);
router.get('/selectFlashTatto', flashTattooController.getAllFlashTattoo);
router.put('/updateFlashTattoo/:id', flashTattooController.updateFlashTattoo);
router.delete('/deleteFlashTattoo/:id', flashTattooController.deleteFlashTattoo);
>>>>>>> ac7bcea5b4cc132acfc570a172f71bd5e6f3fa4d

module.exports = router;
