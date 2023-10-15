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
const confirmaCliente = require ('./router');
const fecharAgenda = require('./router');

app.use(express.json()); 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/src/temp', express.static('src/temp'));
app.use('/agenda', agendaRoutes);
app.use('/agendaConsulta', agendaConRoutes);
app.use('/portfolio', portfolioRoutes);
app.use('/cliente',clienteRoutes);

app.use('/historico', historicoRoutes);
app.use('/estoque', estoqueRoutes);
app.use('/admin', adminRoutes);
app.use('/flashTatto', flashTattoRoutes);

app.use('/confirmaCliente', confirmaCliente);

const port = process.env.PORT || 3636;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
