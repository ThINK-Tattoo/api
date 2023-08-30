const db = require('../database/db');

module.exports = {
    async getAllPortfolio(req, res){
        try{
            const portfolio = await db('portfolio').select('*');
            res.status(200).json(portfolio);

        }catch(err){
            console.error('Erro ao encontrar imagens do portfólio: ', err);
            res.status(500).json({message: "Erro ao localizar imagens no portfólio:"});
        }
    },

    async createPortfolio(req, res){
        const {
            idAdmin,
            imagem,
            descricao
        } = req.body;

        try{
            const[id] = await db('portfolio').insert({
                idAdmin,
                imagem,
                descricao
            });
            res.status(200).json({ message: 'Imagem inserida com sucesso no portfólio'});
    
        }catch(err){
            console.error('Erro ao adicionar imagem ao portfólio: ', err);
            res.status(500).json({message: 'Erro ao adicionar imagem ao portfólio:'});
        }
    },

    async updatePortfolio(req, res){
        const {id} = req.params;

        const{
            idAdmin,
            imagem,
            descricao
        } = req.body;

        try{
            await db('portfolio')
            .where({id})
            .update({
                idAdmin,
                imagem,
                descricao,
            });
            res.status(200).json({ message: 'Item do portfólio atualizado com sucesso.'});
        } catch (err) {
            console.error('Erro ao atualizar item do portfólio: ', err);
            res.status(500).json({ message: 'Erro ao atualizar item do portfólio:' });
        }
    },

    async deletePortfolio(req, res){
        const {id} = req.params;

        try{
            await db('portfolio')
            .where({id})
            .del();
            res.status(200).json({ message: 'Item do portfólio excluido com sucesso.'});
        } catch (err) {
            console.error('Erro ao excluir item do portfólio: ', err);
            res.status(500).json({ message: 'Erro ao excluir item do portfólio:' });
        }
    }
 
}