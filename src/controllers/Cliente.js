const db = require('../database/db');

module.exports = {
    async getAllClientes(req, res){
        try{
            const cliente = await db('cliente').select('*');
            res.status(200).json(cliente);

        }catch(err){
            console.error('Clientes não encontrados', err);
            res.status(500).json({message: "Clientes não encontrados"});
        }
    },

    async createCliente(req, res){
        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            const[id] = await db('cliente').insert({
                nome,
                telefone,
                email,
                idade,
                senha
            });

            res.status(201).json({id, message: 'Cliente cadastrado.'});

        }catch(err){
            console.error('erro ao cadastrar o cliente', err);
            res.status(500).json({message: 'Não foi possível cadastrar o cliente: '});
        }
    },

    async updateCliente(req,res){
        const { id } = req.params;

        const {
            nome,
            telefone,
            email,
            idade,
            senha
        } = req.body;

        try{
            await db('cliente')
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

    async deleteCliente(req, res){
        const {id} = req.params;

        try{
            await db('cliente').where({id}).del();
            res.status(200).json({ message: 'Dados do cliente deletados com sucesso'});
        } catch (err) {
            console.error('Houve um erro ao deletar os dados do cliente.', err);
            res.status(500).json({ message: 'Houve um erro ao deletar os dados do cliente.' });
        }
    }
};