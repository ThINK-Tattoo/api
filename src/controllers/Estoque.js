const db =  require('../database/db.js');

module.exports={
    async getAllEstoque(req, res){
        try{
            const estoque = await db('produtoestoque').select('*');
            res.status(200).json(estoque);
        }

        catch(err){
            console.error('Erro ao buscar os itens no estoque', err);
            res.status(500).json({message: "Erro ao buscas os itens no estoque"});
        }
    },

    async createItemEstoque(req, res){
        const{
            nomeItem,
            descricaoItem,
            dataValidadeItem,
            dataCompraItem,
            quantidadeItem
        } = req.body;

        try{
            const [id] = await db('produtoestoque').insert({
                nomeItem,
                descricaoItem,
                dataValidadeItem,
                dataCompraItem,
                quantidadeItem
            });

            res.status(201).json({id, message: 'Solicitacao de item do estoque'});

        } catch(err){
            console.error('Erro ao solicitar os itens do estoque',err);
            res.status(500).json({message: 'Erro ao solicitar Itens do Estoque'});
        }
    },

    async updateItemEstoque(req, res) {
        const { id } = req.params;

        const{
            nomeItem,
            descricaoItem,
            dataValidadeItem,
            dataCompraItem,
            quantidadeItem
        } =req.body;

        try{
            await db ('produtoestoque').where({id}).update({
                nomeItem,
                descricaoItem,
                dataValidadeItem,
                dataCompraItem,
                quantidadeItem
            });

            res.status(200).json({message:'Item do estoque atualizado!'})
        }

        catch (err) {
            console.error('Erro ao atualizar o item do estoque', err);
            res.status(500).json({message: 'Erro ao atualizar item do estoque'});
        }
    },

    async deleteItemEstoque(req, res){
        const {id} = req.params;

        try{
            await db('produtoestoque').where({id}).del();
            res.status(200).json({message: 'Solicitação de exclusão de item feita com sucesso'})
        }

        catch (err) {
            console.error('Erro ao excluir item do estoque', err);
            res.status(500).json({message: 'Erro ao excluir item do estoque'});
        }

    }

    
}