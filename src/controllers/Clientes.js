const db = require('../database/db');

module.exports = {
    async getAllclientes(req, res){
        try{
            const clientes = await db('clientes').select('*');
            res.status(200).json(clientes);

        }catch(err){
            console.error('clientes não encontrados', err);
            res.status(500).json({message: "clientes não encontrados"});
        }
    },

    async createclientes(req, res){
        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            const[id] = await db('clientes').insert({
                nome,
                telefone,
                email,
                idade,
                senha
            });

            res.status(201).json({id, message: 'cliente cadastrado.'});

        }catch(err){
            console.error('erro ao cadastrar o cliente', err);
            res.status(500).json({message: 'Não foi possível cadastrar o cliente: '});
        }
    },

    async updateclientes(req,res){
        const { id } = req.params;

        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            await db('clientes')
            .where({id})
            .update({
                nome,
                telefone,
                email,
                idade,
                senha
            });
            res.status(200).json({ message: 'Dados do cliente atualizados com sucesso.' });
        } catch (err) {
            console.error('Houve um problema para atualizar seus dados: ', err);
            res.status(500).json({ message: 'Houve um problema para atualizar seus dados: '});
        }
    },

    async deleteclientes(req, res){
        const {id} = req.params;

        try{
            await db('clientes').where({id}).del();
            res.status(200).json({ message: 'Dados do cliente deletados com sucesso'});
        } catch (err) {
            console.error('Houve um erro ao deletar os dados do cliente.', err);
            res.status(500).json({ message: 'Houve um erro ao deletar os dados do cliente.' });
        }
    }
};