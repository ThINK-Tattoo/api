const express = require('express');

const app = express();

const agendaRoutes = require('./router');
const agendaConRoutes = require('./router');
const adminRoutes = require('./router');
const portfolioRoutes = require('./router');
const clienteRoutes = require('./router');
const flashTattoRoutes = require('./router');
const historicoRoutes = require('./router');
const estoqueRoutes = require('./router');

app.use(express.json()); 

app.use('/agenda', agendaRoutes);
app.use('/agendaConsulta', agendaConRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/cliente',clienteRoutes);

app.use('/historico', historicoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/admin', adminRoutes);
app.use('/flashTatto', flashTattoRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});