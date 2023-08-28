// clienteRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
<<<<<<< HEAD
const adminConController = require('./controllers/Admin');

=======
const portifolioController = require('./controllers/Portifolio');
>>>>>>> 957da21134d5e49c591ebfc6e02212c2429765d7

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

<<<<<<< HEAD
//Rotas Admin
router.post('/createAdminCon', adminConController.createAdminConsulta);
router.get('/selectAdminCon', adminConController.getAllAdminConsulta);
router.put('/updateAdminCon/:id', adminConController.updateAdminConsulta);
router.delete('/deleteAdminCon/:id', adminConController.deleteAdminConsulta); 
=======
//Rotas Portifólio
router.post('/createPortifolio', portifolioController.createPortifolio);
router.get('/selectPortifolio', portifolioController.getAllPortifolio);
router.put('/updatePortifolio/:id', portifolioController.updatePortifolio);
router.delete('/deletePortifolio/:id', portifolioController.deletePortifolio);
>>>>>>> 957da21134d5e49c591ebfc6e02212c2429765d7

module.exports = router;
