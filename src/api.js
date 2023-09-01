const express = require('express');
const flashTattoRoutes = require('./router');
const app = express();
const agendaRoutes = require('./router');
const agendaConRoutes = require('./router');
const adminRoutes = require('./router');
const portfolioRoutes = require('./router');
const clientesRoutes = require('./router');

app.use(express.json()); // Middleware para lidar com solicitações JSON

// Outras configurações e rotas...

app.use('/agenda', agendaRoutes);
app.use('/agendaConsulta', agendaConRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/admin', adminRoutes);
<<<<<<< HEAD
app.use('/clientes', clientesRoutes);
=======
app.use('/flashTatto', flashTattoRoutes);
>>>>>>> 78213ca05bc270264d59402a44a2500a8269fe0f

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});