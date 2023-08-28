const db = require('../database/db');

module.exports = {
    async getAllPortifolio(req, res){
        try{
            const agenda = await db('portifolio').select('*');
            res.status(200).json(agenda);

        }catch(err){
            console.error('Erro ao encontrar imagens do portifólio: ', err);
            res.status(500).json({message: "Erro ao localizar imagens no portifólio:"});
        }
    },

    async createPortifolio(req, res){
        const {
            idAdmin,
            imagem,
            descricao
        } = req.body;

        try{
            const[id] = await db('portifolio').insert({
                idAdmin,
                imagem,
                descricao
            });
            res.status(200).json({ message: 'Imagem inserida com sucesso no portifólio'});
    
        }catch(err){
            console.error('Erro ao adicionar imagem ao portifólio: ', err);
            res.status(500).json({message: 'Erro ao adicionar imagem ao portifólio:'});
        }
    },

    async updatePortifolio(req, res){
        const {id} = req.params;

        const{
            idAdmin,
            imagem,
            descricao
        } = req.body;

        try{
            await db('portifolio')
            .where({id})
            .update({
                idAdmin,
                imagem,
                descricao,
            });
            res.status(200).json({ message: 'Item do portifólio atualizado com sucesso.'});
        } catch (err) {
            console.error('Erro ao atualizar item do portifólio: ', err);
            res.status(500).json({ message: 'Erro ao atualizar item do portifólio:' });
        }
    },

    async deletePortifolio(req, res){
        const {id} = req.params;

        try{
            await db('portifolio')
            .where({id})
            .del();
            res.status(200).json({ message: 'Item do portifólio excluido com sucesso.'});
        } catch (err) {
            console.error('Erro ao excluir item do portifólio: ', err);
            res.status(500).json({ message: 'Erro ao excluir item do portifólio:' });
        }
    }
 
}

