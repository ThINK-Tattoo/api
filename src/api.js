const express = require('express');
const flashTattoRoutes = require('./router');
const app = express();
const agendaRoutes = require('./router');
const agendaConRoutes = require('./router');
const adminRoutes = require('./router');
<<<<<<< HEAD
const estoqueRoutes = require('./router');
const historicoRoutes = require ('./router');
const portfolioRoutes = require('./router');
=======
const portfolioRoutes = require('./router');
const clientesRoutes = require('./router');
>>>>>>> ac7bcea5b4cc132acfc570a172f71bd5e6f3fa4d

app.use(express.json()); // Middleware para lidar com solicitações JSON

// Outras configurações e rotas...

app.use('/agenda', agendaRoutes);
app.use('/agendaConsulta', agendaConRoutes);
app.use('/portfolio', portfolioRoutes);
<<<<<<< HEAD
app.use('/historico', historicoRoutes);
=======
app.use('/admin', adminRoutes);
<<<<<<< HEAD
app.use('/clientes', clientesRoutes);
=======
app.use('/flashTatto', flashTattoRoutes);
>>>>>>> 78213ca05bc270264d59402a44a2500a8269fe0f
>>>>>>> ac7bcea5b4cc132acfc570a172f71bd5e6f3fa4d

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});