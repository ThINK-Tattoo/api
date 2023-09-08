const db = require('../database/db');

module.exports = {
    async getAllAgendaConsulta(req, res){
        try{
            const agenda = await db('agendaconsulta').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens pendetes: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens pendentes"});
        }
    },

    async createAgendaConsulta(req, res){
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
            const [id] = await db('agendaconsulta').insert({
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

            res.status(201).json({id, message: 'Solicitação de agendamento da tatuagem feita com sucesso'});

        }catch(err){
            console.error('Erro ao solicitar agendamento: ', err);
            res.status(500).json({message: 'Erro ao solicitar agendamento: '});
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
            await db('agendaconsulta')
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
        }
    }
