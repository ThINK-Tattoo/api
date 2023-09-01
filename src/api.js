const express = require('express');
const app = express();
const agendaRoutes = require('./router');
const agendaConRoutes = require('./router');
const adminRoutes = require('./router');
const estoqueRoutes = require('./router');
const historicoRoutes = require ('./router');
const portfolioRoutes = require('./router');

app.use(express.json()); // Middleware para lidar com solicitações JSON

// Outras configurações e rotas...

app.use('/agenda', agendaRoutes);
app.use('/agendaConsulta', agendaConRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/admin', adminRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/historico', historicoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});