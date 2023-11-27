const db = require('../database/db');

module.exports = {
    async getAllAgendas(req, res){
        try{
            const agenda = await db('confirmaagenda').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao buscar as tatuagens marcadas: ', err);
            res.status(500).json({message: "Erro ao buscar as tatuagens marcadas"});
        }
    },

    async createAgenda(req, res) {
        const { idTatuagem } = req.params; // id da consulta
    
        const {
            idCliente,
            idAdmin,
            nomeCliente,
            tellCliente,
            tamanhoTattoo,
            estOrcamento,
            dataTattoo,
            hTattoo,
            hTerminoTattoo,
            observacoes,
            fotoReferencia,
            tipoTattoo,
            confirmaTattoo
        } = req.body;
    
        try {
            if (confirmaTattoo === "Aceitar") {
                // Inserir na tabela 'confirmaagenda'
                const [id] = await db('confirmaagenda').insert({
                    idCliente,
                    nomeCliente,
                    tellCliente,
                    tamanhoTattoo,
                    estOrcamento,
                    dataTattoo,
                    hTattoo,
                    hTerminoTattoo,
                    observacoes,
                    fotoReferencia,
                    status: "Agendado",
                    tipoTattoo,
                    idAdmin
                });
    
                // Atualizar na tabela 'agendaconsulta'
                await db('agendaconsulta').where({ id: idTatuagem }).update({ status: "Agendado" });
    
                res.status(201).json({ id, message: 'Tatuagem marcada com sucesso.' });
            } else {
                // Apenas atualizar na tabela 'agendaconsulta'
                await db('agendaconsulta').where({ id: idTatuagem }).update({ status: "Cancelado" });
    
                res.status(201).json({ message: 'Tatuagem cancelada com sucesso.' });
            }
        } catch (err) {
            console.error('Erro ao processar agendamento: ', err);
            res.status(500).json({ message: 'Erro ao processar agendamento.' });
        }
    },
    

    async updateAgenda(req, res){
        const { id } = req.params;

        const {
            idCliente,
            idAdmin,
            nomeCliente,
            tellCliente,
            tamanhoTattoo,
            estOrcamento,
            dataTattoo,
            hTattoo,
            hTerminoTattoo,
            observacoes,
            fotoReferencia,
            status,
            tipoTattoo
        } = req.body;

        try{
            await db('confirmaagenda')
            .where({id})
            .update({
                idCliente,
                idAdmin,
                nomeCliente,
                tellCliente,
                tamanhoTattoo,
                estOrcamento,
                dataTattoo,
                hTattoo,
                hTerminoTattoo,
                observacoes,
                fotoReferencia,
                status,
                tipoTattoo
            });
            res.status(200).json({ message: 'Tatuagem marcada atualizada com sucesso.' });
            } catch (err) {
                console.error('Erro ao atualizar tatuagem marcada: ', err);
                res.status(500).json({ message: 'Erro ao atualizar tatuagem marcada.' });
            }
        },

        async deleteAgenda(req, res){
            const {id} = req.params;

            try{
                await db('confirmaagenda').where({id}).del();
                res.status(200).json({ message: 'Tatuagem marcada excluída com sucesso.' });
            } catch (err) {
                console.error('Erro ao excluir tatuagem marcada: ', err);
                res.status(500).json({ message: 'Erro ao excluir tatuagem marcada.' });
            }
        }
    }
