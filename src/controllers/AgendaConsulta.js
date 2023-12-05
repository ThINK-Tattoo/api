const db = require('../database/db');
const moment = require('moment');

module.exports = {
    async getAllAgendaConsulta(req, res){
        const {id} = req.params;
        try{
            const agenda = await db('agendaConsulta')
                .where({idCliente: id})
                .orderByRaw("CASE WHEN status = 'Agendado' or status = 'Cancelado' THEN 0 ELSE 1 END")
                .select('*');

            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens pendetes: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens pendentes"});
        }
    },

    async getAllAgendaConsultaClientes(req, res){
        
        try{
            const agenda = await db('agendaConsulta').select('*').where({status: "Pendente"});

            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens pendetes: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens pendentes"});
        }
    },


async createAgendaConsulta(req, res) {
    const {
        idCliente,
        nomeCliente,
        tellCliente,
        tamanhoTattoo,
        estOrcamento,
        dataTattoo,
        hTattoo,
        observacoes,
        fotoReferencia,
        status,
        tipoTattoo
    } = req.body;

    try {
        const statusAgenda = await db('statusAgenda').select('*').first();
    
        // Verifica se a agenda está fechada para o restante do dia
        if (statusAgenda && statusAgenda.statusAgenda === 'Fechado') {
            const dataFechamento = moment(statusAgenda.dataFechamento).format('YYYY-MM-DD');
            const dataTattooFormatada = moment(dataTattoo).format('YYYY-MM-DD');
          
            if (dataTattooFormatada === dataFechamento) {
              return res.status(400).json({ message: 'Agenda está fechada para o restante do dia.' });
            }
          }

        // Verificar conflitos de horário com 'confirmaAgenda' excluindo agendamentos com status "Feito"
        const [hTerminoTattooValue] = await db('confirmaAgenda')
        .select('hTerminoTattoo')
        .where('dataTattoo', dataTattoo)
        .whereNot('status', 'Feito')
        .whereNot('status', 'Cancelada')
        .orderBy('hTerminoTattoo', 'desc') // Ordene para obter o valor mais recente
        .limit(1);
      
      const hTerminoTattoo = hTerminoTattooValue ? hTerminoTattooValue.hTerminoTattoo : null;
      
      const conflictingAgenda = await db('confirmaAgenda')
        .where('dataTattoo', dataTattoo)
        .whereNot('status', 'Feito') // essa linha ficará aqui até fazer a validação no front
        .where(function () {
          this.where(function () {
            this.where('hTattoo', '<', hTattoo)
              .andWhere('hTerminoTattoo', '>', hTattoo);
          })
          .orWhere(function () {
            this.where('hTattoo', '<', hTerminoTattoo)
              .andWhere('hTerminoTattoo', '>', hTattoo);
          })
          .orWhere(function () {
            this.where('hTattoo', '>=', hTattoo)
              .andWhere('hTerminoTattoo', '<=', hTerminoTattoo);
          });
        })
        .first();
      

        if (conflictingAgenda) {
        return res.status(400).json({ message: 'Conflito de horário com agendamento existente.' });
        }

        // Impedir que novas tatuagens sejam marcadas dentro de 30 minutos do final do horário de uma consulta
        const latestConfirmaAgenda = await db('confirmaAgenda')
        .where('dataTattoo', '<=', dataTattoo)
        .where('hTattoo', '<=', hTattoo)
        .whereNot('status', 'Feito')
        .whereNot('status', 'Cancelada') 
        .orderBy('dataTattoo', 'desc')
        .orderBy('hTattoo', 'desc')
        .first();

        if (
        latestConfirmaAgenda &&
        moment(`${latestConfirmaAgenda.dataTattoo} ${latestConfirmaAgenda.hTerminoTattoo}`).add(30, 'minutes') > moment(`${dataTattoo} ${hTattoo}`)
        ) {
        return res.status(400).json({ message: 'Nova tatuagem não pode ser marcada dentro de 30 minutos do final do horário de uma consulta.' });
        }

        // Continuar com a inserção na tabela 'agendaConsulta'
        const [id] = await db('agendaConsulta').insert(req.body);

        res.status(201).json({ id, message: 'Solicitação de agendamento da tatuagem feita com sucesso' });
    } catch (err) {
        console.error('Erro ao solicitar agendamento: ', err);
        res.status(500).json({ message: 'Erro ao solicitar agendamento.' });
    }
},


    async updateAgendaConsulta(req, res){
        const { id } = req.params;

        const {
            idCliente,
            nomeCliente,
            tellCliente,
            tamanhoTattoo,
            estOrcamento,
            dataTattoo,
            hTattoo,
            observacoes,
            fotoReferencia,
            status,
            tipoTattoo
        } = req.body;

        try{
            await db('agendaConsulta')
            .where({id})
            .update({
                idCliente,
                nomeCliente,
                tellCliente,
                tamanhoTattoo,
                estOrcamento,
                dataTattoo,
                hTattoo,
                observacoes,
                fotoReferencia,
                status,
                tipoTattoo
            });
            res.status(200).json({ message: 'Solicitação de tatuagem atualizada com sucesso.' });
            } catch (err) {
                console.error('Erro ao atualizar solicitação de tatuagem: ', err);
                res.status(500).json({ message: 'Erro ao atualizar solicitação de tatuagem:' });
            }
        },

        async deleteAgendaConsulta(req, res){
            const {id} = req.params;

            try{
                await db('agendaconsulta').where({id}).del();
                res.status(200).json({ message: 'Solicitação de tatuagem excluída com sucesso.' });
            } catch (err) {
                console.error('Erro ao excluir solicitação de tatuagem: ', err);
                res.status(500).json({ message: 'Erro ao excluir solicitação de tatuagem.' });
            }
        },

        
    }
