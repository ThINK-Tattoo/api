// clientesRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
const adminController = require('./controllers/Admin');
const portfolioController = require('./controllers/Portfolio');
const estoqueConController = require('./controllers/Estoque');
const historicoController = require('./controllers/MovimentacaoEstoque');
const clienteController = require('./controllers/Cliente');
const confirmaClienteController = require('./controllers/ConfirmaCliente');
const flashTattooController = require('./controllers/FlashTatto');

//Rotas Agenda Confirma
router.post('/createAgenda/:idTatuagem', agendaController.createAgenda);
router.get('/selectAgenda', agendaController.getAllAgendas);
router.put('/updateAgenda/:id', agendaController.updateAgenda);
router.delete('/deleteAgenda/:id', agendaController.deleteAgenda);

//Rotas Agenda Consulta
router.post('/createAgendaCon', agendaConController.createAgendaConsulta);
router.get('/selectAgendaCon/:id', agendaConController.getAllAgendaConsulta);
router.get('/selectAllAgendaCon', agendaConController.getAllAgendaConsultaClientes);
router.put('/updateAgendaCon/:id', agendaConController.updateAgendaConsulta);
router.delete('/deleteAgendaCon/:id', agendaConController.deleteAgendaConsulta);

//Rotas Admin
router.post('/createAdmin', upload.single('file'), adminController.createAdmin);
router.get('/selectAdmin', adminController.getAllAdmin);
router.put('/updateAdmin/:id', adminController.updateAdmin);
router.delete('/deleteAdmin/:id', adminController.deleteAdmin); 
router.post('/fecharAgenda', adminController.closeAgenda);
router.put('/abrirAgenda', adminController.openAgenda);

//Rotas Portfólio
router.post('/createPortfolio', upload.single('file'), portfolioController.createPortfolio);
router.get('/selectPortfolio', portfolioController.getAllPortfolio);
router.put('/updatePortfolio/:id', upload.single('file'), portfolioController.updatePortfolio);
router.delete('/deletePortfolio/:id', portfolioController.deletePortfolio);

// Rotas Estoque
router.post('/createItemEstoque', estoqueConController.createItemEstoque);
router.get('/selectItemEstoque', estoqueConController.getAllEstoque);
router.put('/updateItemEstoque/:id', estoqueConController.updateItemEstoque);
router.delete('/deleteItemEstoque/:id', estoqueConController.deleteItemEstoque);

// Rotas Movimentação 
router.post('/createMovimentacao', historicoController.createMovimentacaoHistorico);
router.get('/selectMovimentacao', historicoController.getAllMovimentacaoHistorico);
router.delete('/deleteMovimentacao/:id', historicoController.deleteMovimentacaoHistorico);
router.delete('/deleteTodaMovimentacao/:id', historicoController.deleteTodasMovimentacoesEHistorico);

//Rotas clientes
router.post('/createclientes', clienteController.createclientes);
router.get('/selectclientes', clienteController.getAllclientes);
router.put('/updateclientes/:id', clienteController.updateclientes);
router.delete('/deleteclientes/:id', clienteController.deleteclientes);
router.post('/reqRedefinicaoSenha', clienteController.requestResetPass);
router.post('/verifyToken', clienteController.verifyToken);
router.put('/updateSenha/:email', clienteController.resetPassword);
router.post('/login', clienteController.AutenticacaoLogin);
router.post('/contato', clienteController.sendContatoMail);

//Rotas Flash Tattoo
router.post('/createFlashTattoo', upload.single('file'), flashTattooController.createFlashTattoo);
router.get('/selectFlashTattoo', flashTattooController.getAllFlashTattoo);
router.put('/updateFlashTattoo/:id', upload.single('file'), flashTattooController.updateFlashTattoo);
router.delete('/deleteFlashTattoo/:id', flashTattooController.deleteFlashTattoo);

//Rotas Confirma Cliente
router.post('/createConfirmaCliente', confirmaClienteController.createConfirmaClientes);
router.post('/verifyTokenConfirmaCliente', confirmaClienteController.verifyTokenConfirmaCliente);



module.exports = router;
