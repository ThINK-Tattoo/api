// clienteRoutes.js
const express = require('express');
const router = express.Router();
const agendaConController = require('./controllers/AgendaConsulta');
const agendaController = require('./controllers/AgendaConfirma');
const adminConController = require('./controllers/Admin');


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
router.post('/createAdminCon', adminConController.createAdminConsulta);
router.get('/selectAdminCon', adminConController.getAllAdminConsulta);
router.put('/updateAdminCon/:id', adminConController.updateAdminConsulta);
router.delete('/deleteAdminCon/:id', adminConController.deleteAdminConsulta); 

module.exports = router;
