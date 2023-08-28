// clienteRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
const portifolioController = require('./controllers/Portifolio');

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

//Rotas Portifólio
router.post('/createPortifolio', portifolioController.createPortifolio);
router.get('/selectPortifolio', portifolioController.getAllPortifolio);
router.put('/updatePortifolio/:id', portifolioController.updatePortifolio);
router.delete('/deletePortifolio/:id', portifolioController.deletePortifolio);

module.exports = router;
